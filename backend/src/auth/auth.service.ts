import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return {
      sessionToken: await this.generateToken(user),
      user: { name: user.name, email: user.email },
    };
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return {
      sessionToken: await this.generateToken(user),
      user: { name: user.name, email: user.email },
    };
  }
  async getViewer(sessionToken: string) {
    const user = await this.validateSessionToken(sessionToken);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Session dont found',
      });
    }
    return { name: user.name, email: user.email };
  }
  async validateUserRequest(
    sessionToken: string,
    errorMessage: string,
  ): Promise<User> {
    const user = await this.validateSessionToken(sessionToken);
    if (!user) {
      throw new UnauthorizedException({
        message: errorMessage,
      });
    }
    return user;
  }
  private async validateSessionToken(
    sessionToken: string,
  ): Promise<User | null> {
    try {
      return (await this.jwtService.verify(sessionToken.split(' ')[1])) as User;
    } catch (e) {
      return null;
    }
  }
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return this.jwtService.sign(payload);
  }
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User does not exist',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'incorrect email or password' });
  }
}

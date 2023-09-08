import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  readonly email: string;
  @IsString({ message: 'Must be string' })
  @Length(6, 16, {
    message: 'Password must be longer that 6 and shorted that 16',
  })
  readonly password: string;
  @IsString({ message: 'Must be string' })
  readonly name: string;
}

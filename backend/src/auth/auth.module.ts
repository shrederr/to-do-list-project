import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.PRIVAT_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}

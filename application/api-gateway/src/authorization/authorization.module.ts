import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthorizationService } from './authorization.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_STRING,
    }),
  ],
  providers: [AuthorizationService, JwtStrategy],
  exports: [AuthorizationService, JwtStrategy],
})
export class AuthorizationModule {}

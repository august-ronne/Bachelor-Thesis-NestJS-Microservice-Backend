import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(userLoginData: LoginUserDto): Promise<any> {
    const user = await this.usersService.findUser(userLoginData.email);
    if (user && user.password === userLoginData.password) {
      const payload = { sub: user.id, role: user.role };
      const { password, ...rest } = user;
      return {
        access_token: this.jwtService.sign(payload),
        user: rest,
      };
    }
    return new UnauthorizedException();
  }
}

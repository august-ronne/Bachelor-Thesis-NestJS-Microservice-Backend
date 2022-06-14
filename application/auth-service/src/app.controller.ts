import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginUserDto } from './authentication/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private authenticationService: AuthenticationService) {}

  @MessagePattern('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authenticationService.authenticateUser(
      loginUserDto,
    );
    return user;
  }

  @MessagePattern('protected-test')
  protected(req: Object): string {
    console.log(req);
    return 'successfully called protected route!';
  }
}

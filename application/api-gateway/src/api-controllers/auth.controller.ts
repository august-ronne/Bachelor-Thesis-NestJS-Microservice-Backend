import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from 'src/authorization/decorators/roles.enum';
import { JwtGuard } from 'src/authorization/guards/jwt.guard';
import { RolesGuard } from 'src/authorization/guards/roles.guard';

@Controller('api/auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  @Post('login')
  login(@Body() loginData: Object): Observable<Object> {
    console.log(loginData);
    return this.authService.send<Object>('login', loginData);
  }

  @Get('test')
  test(): string {
    return 'hello';
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('protected-route')
  protected(@Request() req): Observable<string> {
    console.log(req.user);
    return this.authService.send<string>('protected-test', '');
  }
}

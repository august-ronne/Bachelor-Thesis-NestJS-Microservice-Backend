import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from 'src/authorization/decorators/roles.enum';
import { JwtGuard } from 'src/authorization/guards/jwt.guard';
import { RolesGuard } from 'src/authorization/guards/roles.guard';

@Controller('api/user-resource')
export class UserResourceController {
  constructor(
    @Inject('USER_RESOURCE_SERVICE') private userResourceService: ClientProxy,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('get-all')
  getAllUserResources(): Observable<Object[]> {
    console.log('>  (API GATEWAY) getAllUserResources() triggered');
    return this.userResourceService.send('get-all-user-resources', '');
  }

  @Roles(Role.User)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createNewUserResource(@Body() userResourceData: Object): Observable<Object> {
    console.log('>  (API GATEWAY) createNewUserResource() triggered');
    console.log(userResourceData);
    return this.userResourceService.send<Object>(
      'create-new-user-resource',
      userResourceData,
    );
  }
}

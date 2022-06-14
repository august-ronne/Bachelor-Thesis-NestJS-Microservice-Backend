import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from 'src/authorization/decorators/roles.enum';
import { JwtGuard } from 'src/authorization/guards/jwt.guard';
import { RolesGuard } from 'src/authorization/guards/roles.guard';

@Controller('api/resource')
export class ResourceController {
  constructor(
    @Inject('RESOURCE_SERVICE') private resourceService: ClientProxy,
  ) {}

  @UseGuards(JwtGuard)
  @Get('get-all')
  getAllResources(): Observable<Object[]> {
    return this.resourceService.send('get-all-resources', '');
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createNewResource(@Body() resourceData: Object): Observable<Object> {
    console.log('> are we even here?');
    console.log(resourceData);
    return this.resourceService.send<Object>(
      'create-new-resource',
      resourceData,
    );
  }
}

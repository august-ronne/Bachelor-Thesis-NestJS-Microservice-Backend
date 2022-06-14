import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { CreateResourceDto } from './dto/create-user-resource.dto';
import { UserResource } from './entities/user-resource.entity';
import { UserResourceService } from './user-resource.service';

@Controller()
export class UserResourceController {
  constructor(
    private readonly userResourceService: UserResourceService,
    @Inject('NOTIFICATIONS_SERVICE') private notificationsService: ClientProxy,
  ) {}

  @MessagePattern('get-all-user-resources')
  async getAllUserResources(): Promise<Object[]> {
    return this.userResourceService.getAll();
  }

  @MessagePattern('create-new-user-resource')
  async createNewUserResource(
    @Body() createUserResourceDto: CreateResourceDto,
  ): Promise<UserResource> {
    const newUserResource = await this.userResourceService.create(
      createUserResourceDto,
    );
    this.notificationsService.emit<Object>(
      'new-user-resource-created',
      newUserResource,
    );
    return newUserResource;
  }
}

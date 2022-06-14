import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceService } from './resource.service';
import { Resource } from './schemas/resource.schema';

@Controller()
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @MessagePattern('create-new-resource')
  async createNewResource(
    @Body() createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    const resource = await this.resourceService.create(createResourceDto);
    return resource;
  }

  @MessagePattern('get-all-resources')
  async getAllResources(): Promise<Resource[]> {
    return await this.resourceService.getAll();
  }
}

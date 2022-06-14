import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel('Resource')
    private readonly resourceModel: Model<ResourceDocument>,
  ) {}

  async create(resource: Resource): Promise<Resource> {
    const newResource = new this.resourceModel(resource);
    return await newResource.save();
  }

  async getAll(): Promise<Resource[]> {
    return await this.resourceModel.find();
  }
}

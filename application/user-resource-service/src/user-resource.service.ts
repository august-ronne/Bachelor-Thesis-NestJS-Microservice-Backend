import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserResource } from './entities/user-resource.entity';

@Injectable()
export class UserResourceService {
  constructor(
    @InjectRepository(UserResource)
    private userResourceRepository: Repository<UserResource>,
    private connection: Connection,
  ) {}

  async getAll(): Promise<UserResource[]> {
    return await this.userResourceRepository.find();
  }

  async create(userResource: UserResource): Promise<UserResource> {
    const newUserResource = this.userResourceRepository.create(userResource);
    return await this.userResourceRepository.save(newUserResource);
  }
}

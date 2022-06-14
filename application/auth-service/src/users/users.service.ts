import { Injectable } from '@nestjs/common';
import { Role } from './roles.enum';

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role[];
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'admin@test.com',
      password: 'password',
      role: [Role.Admin],
    },
    {
      id: 2,
      email: 'regular_user1@test.com',
      password: 'password',
      role: [Role.User],
    },
    {
      id: 3,
      email: 'regular_user2@test.com',
      password: 'password',
      role: [Role.User],
    },
  ];

  async findUser(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUser: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;

    const passwordHash = await hash(createUser.password, saltOrRounds);

    const user: User = {
      ...createUser,
      id: this.users.length + 1,
      password: passwordHash,
    };

    this.users.push(user);

    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}

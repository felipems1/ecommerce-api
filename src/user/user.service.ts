import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHash = await hash(createUser.password, saltOrRounds);

    return this.userRepository.save({
      ...createUser,
      typeUser: 1,
      password: passwordHash,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(userId: string): Promise<UserEntity> {
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('UserId Not Found');
    }

    return user;
  }
}

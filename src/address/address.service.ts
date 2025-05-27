import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: string,
  ): Promise<AddressEntity> {
    await this.userService.getUserById(userId);

    await this.cityService.getCityById(createAddressDto.cityId);

    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}

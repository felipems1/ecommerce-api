import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    CacheModule.register({
      ttl: 15 * 60 * 1000, // 15 minutos,
    }),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,

    private readonly cacheService: CacheService,
  ) {}

  async getAllState(): Promise<StateEntity[]> {
    return this.cacheService.getCache<StateEntity[]>('states_all', () =>
      this.stateRepository.find(),
    );
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { PersonalComercioService } from './personal-comercio.service';

describe('PersonalComercioService', () => {
  let service: PersonalComercioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalComercioService],
    }).compile();

    service = module.get<PersonalComercioService>(PersonalComercioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

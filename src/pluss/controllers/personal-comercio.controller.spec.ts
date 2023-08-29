import { Test, TestingModule } from '@nestjs/testing';
import { PersonalComercioController } from './personal-comercio.controller';

describe('PersonalComercioController', () => {
  let controller: PersonalComercioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalComercioController],
    }).compile();

    controller = module.get<PersonalComercioController>(PersonalComercioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ParametricaController } from './parametrica.controller';

describe('ParametricaController', () => {
  let controller: ParametricaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParametricaController],
    }).compile();

    controller = module.get<ParametricaController>(ParametricaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialController } from './red-social.controller';

describe('RedSocialController', () => {
  let controller: RedSocialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedSocialController],
    }).compile();

    controller = module.get<RedSocialController>(RedSocialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PickingSlipService } from './picking-slip.service';

describe('PickingSlipService', () => {
  let service: PickingSlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PickingSlipService],
    }).compile();

    service = module.get<PickingSlipService>(PickingSlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

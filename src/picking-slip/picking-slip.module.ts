import { Module } from '@nestjs/common';
import { PickingSlipService } from './picking-slip.service';

@Module({
  providers: [PickingSlipService]
})
export class PickingSlipModule {}

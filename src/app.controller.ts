import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PickingSlipService } from './picking-slip/picking-slip.service';
import { GetParams, PickingSlip } from './picking-slip/picking-slip.interface';

interface PickingSlipRes {
  pickingSlips: PickingSlip[];
  // metadata: {
  //   page: number;
  //   limit: number;
  // };
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pickingSlipService: PickingSlipService,
  ) {}

  @Get()
  async getPickingSlip(@Query() query: GetParams): Promise<PickingSlipRes> {
    const pickingSlips = await this.pickingSlipService.get({ ...query });

    return {
      pickingSlips,
    };
  }
}

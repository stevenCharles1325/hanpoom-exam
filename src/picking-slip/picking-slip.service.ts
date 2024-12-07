import { Injectable } from '@nestjs/common';
import { GetParams, PickingSlip } from './picking-slip.interface';
import { DataSource } from 'typeorm';
import { PickingSlip as PS } from 'src/database/entities/picking-slip.entity';

const STATUS = {
  PRINTED: `DATE(psd.printed_at) = '0000-00-00' AND DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00'`,
  NOT_PRINTED: `DATE(psd.printed_at) != '0000-00-00' AND (DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00')`,
  HELD: `DATE(held_at) != '0000-00-00'`,
};

@Injectable()
export class PickingSlipService {
  constructor(private datasource: DataSource) {}

  async get(params: GetParams): Promise<PickingSlip[]> {
    const {
      sort = 'asc',
      page = 1,
      limit = 250,
      pickingSlipStatus = 'printed',
    } = params;

    const queryRunner = this.datasource
      .getRepository(PS)
      .createQueryBuilder('ps')
      .select([
        'ps.order_id as orderId',
        'ps.id as pickingSlipId',
        'psi.is_pre_order as hasPreOrderItems',
      ])
      .addSelect(
        `
        CASE
          WHEN ${STATUS.NOT_PRINTED} THEN 'not printed'
          WHEN ${STATUS.PRINTED} THEN 'printed'
          WHEN ${STATUS.HELD} THEN 'held'
        END
        `,
        'pickingSlipStatus',
      )
      .innerJoin('ps.pickingSlipItems', 'psi')
      .innerJoin('ps.pickingSlipDate', 'psd');

    const result = (await queryRunner
      .where(STATUS[pickingSlipStatus.toUpperCase()])
      .orderBy('ps.created_at', sort.toUpperCase() as any)
      .limit(limit)
      .offset(limit * page)
      .getRawMany()) as unknown as PickingSlip[];

    return result.map(({ hasPreOrderItems, ...rest }) => ({
      ...rest,
      hasPreOrderItems: Boolean(hasPreOrderItems),
    }));
  }
}

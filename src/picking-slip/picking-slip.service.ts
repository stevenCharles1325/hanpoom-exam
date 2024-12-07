import { Injectable } from '@nestjs/common';
import { GetParams, PickingSlip } from './picking-slip.interface';
import { DataSource } from 'typeorm';

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

    let statusWhereClause = '1';

    switch (pickingSlipStatus) {
      case 'held':
        statusWhereClause = `DATE(held_at) != '0000-00-00'`;
        break;

      case 'printed':
        statusWhereClause = `DATE(psd.printed_at) != '0000-00-00' AND (DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00')`;
        break;

      case 'not printed':
        statusWhereClause = `DATE(psd.printed_at) = '0000-00-00' AND DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00'`;
        break;
    }

    const queryRunner = this.datasource.createQueryRunner();
    const query = `
      SELECT
        ps.order_id as orderId,
        psi.picking_slip_id as pickingSlipId,
        psi.is_pre_order as hasPreOrderItems,
        ps.created_at as createdAt,
        CASE
          WHEN DATE(psd.printed_at) = '0000-00-00' AND DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00' THEN 'not printed'
          WHEN DATE(psd.printed_at) != '0000-00-00' AND (DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00') THEN 'printed'
          WHEN DATE(held_at) != '0000-00-00' THEN 'held'
        END AS pickingSlipStatus
      FROM picking_slips as ps
      JOIN picking_slip_items psi
        ON ps.id = psi.picking_slip_id
      JOIN picking_slip_dates psd
        ON ps.id = psd.picking_slip_id
      WHERE ${statusWhereClause}
      ORDER BY createdAt ${sort?.toUpperCase()}
      LIMIT ${limit} OFFSET ${limit * page};
    `;

    const result = (await queryRunner.query(query)) as PickingSlip[];

    return result.map(({ hasPreOrderItems, ...rest }) => ({
      ...rest,
      hasPreOrderItems: Boolean(hasPreOrderItems),
    }));
  }
}

export interface PickingSlip {
  orderId: number;
  pickingSlipId: number;
  pickingSlipStatus: 'not printed' | 'printed' | 'held';
  hasPreOrderItems: boolean;
}

export interface GetParams {
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  pickingSlipStatus?: PickingSlip['pickingSlipStatus'];
}

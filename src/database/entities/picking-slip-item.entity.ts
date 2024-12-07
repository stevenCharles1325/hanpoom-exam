import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PickingSlip } from './picking-slip.entity';

@Entity({ name: 'picking_slip_items' })
export class PickingSlipItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'picking_slip_id' })
  pickingSlipId: number;

  @Column({ name: 'item_id' })
  itemId: number;

  @Column({ name: 'stock_id' })
  stockId: number;

  @Column({ name: 'order_fulfillment_product_id' })
  orderFulfillmentProductId: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'refunded_quantity' })
  refundedQuantity: number;

  @Column({ name: 'location_id' })
  locationId: number;

  @Column({ name: 'location_code' })
  locationCode: string;

  @Column({
    type: 'tinyint',
    transformer: {
      to: (value: boolean) => Number(value),
      from: (value: number) => Boolean(value),
    },
    name: 'is_pre_order',
  })
  isPreOrder: boolean;

  @Column({
    type: 'tinyint',
    transformer: {
      to: (value: boolean) => Number(value),
      from: (value: number) => Boolean(value),
    },
    name: 'is_sales_only',
  })
  isSalesOnly: number;

  @Column({ type: 'timestamp', name: 'pre_order_shipping_at' })
  preOrderShippingAt: number;

  @Column({ type: 'timestamp', name: 'pre_order_deadline_at' })
  preOrderDeadlineAt: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => PickingSlip, (pickingSlip) => pickingSlip.pickingSlipItems)
  @JoinColumn({ name: 'picking_slip_id' })
  pickingSlip: PickingSlip;
}

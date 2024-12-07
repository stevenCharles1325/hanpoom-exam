import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PickingSlipDate } from './picking-slip-date.entity';
import { PickingSlipItem } from './picking-slip-item.entity';

@Entity({ name: 'picking_slips' })
export class PickingSlip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'order_fulfillment_order_id' })
  orderFulfillmentOrderId: number;

  @Column({ name: 'is_contained_single_product' })
  isContainedSingleProduct: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relationships
  @OneToOne(
    () => PickingSlipDate,
    (pickingSlipDate) => pickingSlipDate.pickingSlip,
  )
  pickingSlipDate: PickingSlipDate;

  @OneToMany(
    () => PickingSlipItem,
    (pickingSlipItem) => pickingSlipItem.pickingSlip,
  )
  pickingSlipItems: PickingSlipItem[];
}

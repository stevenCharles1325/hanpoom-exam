import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PickingSlip } from './picking-slip.entity';

@Entity({ name: 'picking_slip_dates' })
export class PickingSlipDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'picking_slip_id' })
  pickingSlipId: number;

  @Column({ name: 'printed_username' })
  printedUsername: number;

  @Column({ name: 'packed_username' })
  packedUsername: number;

  @Column({ name: 'shipped_username' })
  shippedUsername: number;

  @Column({ name: 'held_username' })
  heldUsername: number;

  @Column({ name: 'cancelled_username' })
  cancelledUsername: number;

  @Column({ name: 'refunded_username' })
  refundedUsername: number;

  @Column({ name: 'confirmed_username' })
  confirmedUsername: string;

  @Column({ type: 'timestamp', name: 'printed_at' })
  printedAt: number;

  @Column({ type: 'timestamp', name: 'inspected_at' })
  inspectedAt: number;

  @Column({ type: 'timestamp', name: 'packed_at' })
  packedAt: number;

  @Column({ type: 'timestamp', name: 'shipped_at' })
  shippedAt: number;

  @Column({ type: 'timestamp', name: 'delivered_at' })
  deliveredAt: number;

  @Column({ type: 'timestamp', name: 'returned_at' })
  returnedAt: number;

  @Column({ type: 'timestamp', name: 'cancelled_at' })
  cancelledAt: number;

  @Column({ type: 'timestamp', name: 'refunded_at' })
  refundedAt: number;

  @Column({ type: 'timestamp', name: 'held_at' })
  heldAt: number;

  @Column({ type: 'timestamp', name: 'confirmed_at' })
  confirmedAt: number;

  @Column({ name: 'held_reason' })
  heldReason: string;

  // @VirtualColumn({
  //   query: () => `
  //   SELECT
  //     CASE
  //       WHEN DATE(psd.printed_at) = '0000-00-00' AND DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00' THEN 'not printed'
  //       WHEN DATE(psd.printed_at) != '0000-00-00' AND (DATE(psd.inspected_at) = '0000-00-00' AND DATE(psd.shipped_at) = '0000-00-00' AND DATE(psd.held_at) = '0000-00-00') THEN 'printed'
  //       WHEN DATE(held_at) != '0000-00-00' THEN 'held'
  //     END AS pickingSlipStatus
  //   FROM picking_slip_dates
  // `,
  // })
  // pickingSlipStatus: string;

  // Relationships
  @OneToOne(() => PickingSlip, (pickingSlip) => pickingSlip.pickingSlipDate)
  @JoinColumn({ name: 'picking_slip_id' })
  pickingSlip: PickingSlip;
}

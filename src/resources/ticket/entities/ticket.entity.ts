import { Status } from 'src/common/enum/status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ticket' })
export class Ticket {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'contact_info', type: 'text', nullable: false })
  contactInfo: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  status: Status;
}

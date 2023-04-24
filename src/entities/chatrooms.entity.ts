import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Chatroom {
  @ObjectIdColumn()
  _id: string;

  @Column()
  chatroom_id: string;

  @Column('simple-array')
  participants: string[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  _id: string;

  @Column()
  chatroom_id: string;

  @Column()
  sender_id: string;

  @Column()
  content: string;

  @Column({ default: () => new Date() })
  created_at: Date;
}

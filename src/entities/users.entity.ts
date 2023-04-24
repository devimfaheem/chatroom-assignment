import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

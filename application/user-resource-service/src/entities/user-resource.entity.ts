import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  resource_id: string;

  @Column()
  description: string;
}

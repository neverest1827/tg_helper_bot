import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegramId: string;

  @Column({ nullable: true })
  username: string;

  @Column({ default: 'uk' })
  lang: string;

  @Column({ type: 'json', nullable: true })
  answers: Record<string, any>;
}

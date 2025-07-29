import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column('text')
  text: string;

  @Column({ default: 'uk' })
  lang: string;

  @Column({ type: 'json', nullable: true })
  buttons?: InlineKeyboardButton[][];
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async get(
    key: string,
    lang = 'uk',
  ): Promise<{ text: string; buttons?: InlineKeyboardButton[][] }> {
    const message: Message | null = await this.messageRepository.findOneBy({
      key,
      lang,
    });

    if (!message) throw new Error(`Message not found: ${key} (${lang})`);

    return {
      text: message.text,
      buttons: message.buttons,
    };
  }
}

import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { BotUpdate } from './bot.update';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MessageModule, UserModule],
  providers: [BotUpdate],
})
export class BotModule {}

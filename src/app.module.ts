import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { telegrafConfig } from './telegraf.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: telegrafConfig,
      inject: [ConfigService],
    }),
    BotModule,
    UserModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

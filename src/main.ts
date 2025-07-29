import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const botMiddleware = app.get(getBotToken());

  const webhookPath = process.env.WEBHOOK_PATH || '/bot-webhook';
  app.use(botMiddleware.webhookCallback(webhookPath));

  await app.listen(process.env.PORT ?? 3000);
  console.log('Bot is running on http://localhost:3000');
}
bootstrap();

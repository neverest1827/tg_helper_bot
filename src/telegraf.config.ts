import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';

export const telegrafConfig = (
  configService: ConfigService,
): TelegrafModuleOptions => {
  const token = configService.get<string>('BOT_TOKEN');
  const domain = configService.get<string>('WEBHOOK_DOMAIN');
  const path = configService.get<string>('WEBHOOK_PATH');

  if (!token) throw new Error('BOT_TOKEN is not set');
  if (!domain) throw new Error('WEBHOOK_DOMAIN is not set');
  if (!path) throw new Error('WEBHOOK_PATH is not set');

  return {
    token,
    launchOptions: {
      webhook: {
        domain,
        path,
      },
    },
  };
};

import { Action, Ctx, Start, Update } from 'nestjs-telegraf';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    const { text, buttons } = await this.messageService.get('start');
    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action(/^intro_/)
  async onIntro(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();

    let lang: string = 'uk';

    if ('data' in ctx.callbackQuery!) {
      lang = ctx.callbackQuery.data.split('_')[1];
    }

    const telegramId = ctx.from!.id.toString();
    const username = ctx.from?.username;

    let user: User | null = await this.userService.findByTelegramId(telegramId);

    if (!user) {
      user = await this.userService.create({
        telegramId,
        username,
        lang,
      });
    }

    const { text, buttons } = await this.messageService.get('intro', user.lang);

    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action('time')
  async onTime(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();

    const telegramId = ctx.from!.id.toString();
    const user = (await this.userService.findByTelegramId(telegramId)) as User;

    const { text, buttons } = await this.messageService.get('time', user.lang);

    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action(/^hours_.+/)
  async onHoursChoice(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();

    let choice: string = '';

    if ('data' in ctx.callbackQuery!) {
      choice = ctx.callbackQuery.data;
    }

    const telegramId = ctx.from!.id.toString();

    const user: User = await this.userService.saveAnswer(
      telegramId,
      'hours',
      choice,
    );

    const platform: string =
      choice === 'hours_1_4' ? 'platform_1' : 'platform_2';
    const { text, buttons } = await this.messageService.get(
      platform,
      user.lang,
    );

    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action('platform_1')
  async onPlatformOneChoice(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    const telegramId = ctx.from!.id.toString();

    const user = (await this.userService.findByTelegramId(telegramId)) as User;
    const { text, buttons } = await this.messageService.get(
      'platform_1',
      user.lang,
    );

    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action('platform_2')
  async onPlatformTwoChoice(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    const telegramId = ctx.from!.id.toString();

    const user = (await this.userService.findByTelegramId(telegramId)) as User;
    const { text, buttons } = await this.messageService.get(
      'platform_2',
      user.lang,
    );

    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action(/^register_.+/)
  async onRegisterChoice(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();

    let choice: string = '';

    if ('data' in ctx.callbackQuery!) {
      choice = ctx.callbackQuery.data;
    }

    const telegramId = ctx.from!.id.toString();

    const user: User = await this.userService.saveAnswer(
      telegramId,
      'platform',
      choice,
    );

    const { text, buttons } = await this.messageService.get(
      'registration',
      user.lang,
    );

    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: buttons ?? [],
      },
    });
  }

  @Action('young')
  async onYoungChoice(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();

    const telegramId = ctx.from!.id.toString();

    const user = (await this.userService.findByTelegramId(telegramId)) as User;
    const { text } = await this.messageService.get('young', user.lang);

    await ctx.reply(text);
  }
}

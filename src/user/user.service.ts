import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByTelegramId(telegramId: string) {
    return this.userRepo.findOne({ where: { telegramId } });
  }

  async create(data: Partial<User>) {
    const user: User = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async saveAnswer(telegramId: string, key: string, value: any) {
    let user = await this.findByTelegramId(telegramId);
    if (!user) {
      user = this.userRepo.create({ telegramId });
    }

    user.answers = { ...(user.answers || {}), [key]: value };
    return this.userRepo.save(user);
  }
}

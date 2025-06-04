import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAnswersService {
  protected readonly logger = new Logger(UserAnswersService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, answerId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      this.logger.error(`User with ID ${userId} not found`);
      throw new NotFoundException('User not found');
    }

    const answer = await this.prismaService.answer.findUnique({
      where: { id: answerId },
    });
    if (!answer) {
      this.logger.error(`Answer with ID ${answerId} not found`);
      throw new NotFoundException('Answer not found');
    }

    return this.prismaService.userAnswers.create({
      data: {
        userId,
        answerId,
      },
    });
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  protected readonly logger = new Logger(QuestionsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(questionId: number) {
    const question = this.prismaService.question.findUnique({
      where: { id: questionId },
      include: { answers: true },
    });

    if (!question) {
      this.logger.error(`Question with ID ${questionId} not found`);
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    return question;
  }
}

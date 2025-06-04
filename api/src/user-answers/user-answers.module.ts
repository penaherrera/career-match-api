import { Module } from '@nestjs/common';
import { UserAnswersService } from './services/user-answers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAnswersController } from './user-answers.controller';
import { CalculatorService } from './services/calculator.service';

@Module({
  providers: [UserAnswersService, PrismaService, CalculatorService],
  controllers: [UserAnswersController],
})
export class UserAnswersModule {}

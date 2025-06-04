import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserAnswersService } from './services/user-answers.service';
import { CalculatorService } from './services/calculator.service';

@Controller('user-answers')
export class UserAnswersController {
  constructor(
    private readonly userAnswersService: UserAnswersService,
    private readonly calculatorService: CalculatorService,
  ) {}

  @Post()
  create(@Body() body: { userId: number; answerId: number }) {
    return this.userAnswersService.create(body.userId, body.answerId);
  }

  @Get(':userId')
  async getCareerPercentages(@Param('userId') userId: number) {
    return this.calculatorService.calculateCareerPercentages(userId);
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { UserAnswersModule } from './user-answers/user-answers.module';

@Module({
  imports: [PrismaModule, QuestionsModule, AuthModule, UserAnswersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

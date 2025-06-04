import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CalculatorService {
  private readonly logger = new Logger(CalculatorService.name);

  constructor(private readonly prisma: PrismaService) {}

  async calculateCareerPercentages(userId: number) {
    const userAnswers = await this.prisma.userAnswers.findMany({
      where: { userId },
      include: {
        answer: {
          include: {
            career: true,
          },
        },
      },
    });

    const careerCounts = {};
    let totalAnswers = 0;

    userAnswers.forEach(({ answer }) => {
      if (answer.career) {
        const careerId = answer.career.id;
        careerCounts[careerId] = (careerCounts[careerId] || 0) + 1;
        totalAnswers++;
      }
    });

    const result = await Promise.all(
      Object.entries(careerCounts).map(async ([careerId, count]) => {
        const numericCount = count as number;
        const career = await this.prisma.career.findUnique({
          where: { id: parseInt(careerId) },
        });

        return {
          careerId: parseInt(careerId),
          careerName: career ? career.name : 'Unknown',
          count: numericCount,
          percentage: Math.round((numericCount / totalAnswers) * 100),
        };
      }),
    );

    result.sort((a, b) => b.percentage - a.percentage);

    return {
      totalAnswers,
      careerMatches: result,
    };
  }
}

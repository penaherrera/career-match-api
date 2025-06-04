import { PrismaService } from 'src/prisma/prisma.service';
export declare class CalculatorService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    calculateCareerPercentages(userId: number): Promise<{
        totalAnswers: number;
        careerMatches: {
            careerId: number;
            careerName: string;
            count: number;
            percentage: number;
        }[];
    }>;
}

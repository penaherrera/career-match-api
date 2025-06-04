import { UserAnswersService } from './services/user-answers.service';
import { CalculatorService } from './services/calculator.service';
export declare class UserAnswersController {
    private readonly userAnswersService;
    private readonly calculatorService;
    constructor(userAnswersService: UserAnswersService, calculatorService: CalculatorService);
    create(body: {
        userId: number;
        answerId: number;
    }): Promise<{
        id: number;
        userId: number;
        answerId: number;
    }>;
    getCareerPercentages(userId: number): Promise<{
        totalAnswers: number;
        careerMatches: {
            careerId: number;
            careerName: string;
            count: number;
            percentage: number;
        }[];
    }>;
}

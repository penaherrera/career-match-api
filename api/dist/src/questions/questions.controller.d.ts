import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    findById(questionId: number): Promise<({
        answers: {
            id: number;
            content: string;
            careerId: number;
            questionId: number;
        }[];
    } & {
        id: number;
        text: string;
    }) | null>;
}

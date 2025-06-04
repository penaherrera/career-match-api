import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class QuestionsService {
    private readonly prismaService;
    protected readonly logger: Logger;
    constructor(prismaService: PrismaService);
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

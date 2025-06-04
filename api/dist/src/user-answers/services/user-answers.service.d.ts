import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserAnswersService {
    private readonly prismaService;
    protected readonly logger: Logger;
    constructor(prismaService: PrismaService);
    create(userId: number, answerId: number): Promise<{
        id: number;
        userId: number;
        answerId: number;
    }>;
}

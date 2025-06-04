import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly prismaService;
    protected readonly logger: Logger;
    constructor(prismaService: PrismaService);
    signUp(name: string, email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
    login(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
}

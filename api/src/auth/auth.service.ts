import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  protected readonly logger = new Logger(AuthService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(name: string, email: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (user) {
      this.logger.error(`User already has an account`);
      throw new ConflictException(`User already has an account`);
    }
    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user) {
      this.logger.error(`User does not have an account`);
      throw new ConflictException(`User does not have an account`);
    }

    if (user.password !== password) {
      this.logger.error(`Invalid credentials`);
      throw new UnauthorizedException(`Invalid credentials`);
    }

    return user;
  }
}

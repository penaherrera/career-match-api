"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserAnswersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnswersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserAnswersService = UserAnswersService_1 = class UserAnswersService {
    prismaService;
    logger = new common_1.Logger(UserAnswersService_1.name);
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(userId, answerId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            this.logger.error(`User with ID ${userId} not found`);
            throw new common_1.NotFoundException('User not found');
        }
        const answer = await this.prismaService.answer.findUnique({
            where: { id: answerId },
        });
        if (!answer) {
            this.logger.error(`Answer with ID ${answerId} not found`);
            throw new common_1.NotFoundException('Answer not found');
        }
        return this.prismaService.userAnswers.create({
            data: {
                userId,
                answerId,
            },
        });
    }
};
exports.UserAnswersService = UserAnswersService;
exports.UserAnswersService = UserAnswersService = UserAnswersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserAnswersService);
//# sourceMappingURL=user-answers.service.js.map
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
var CalculatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CalculatorService = CalculatorService_1 = class CalculatorService {
    prisma;
    logger = new common_1.Logger(CalculatorService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculateCareerPercentages(userId) {
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
        const result = await Promise.all(Object.entries(careerCounts).map(async ([careerId, count]) => {
            const numericCount = count;
            const career = await this.prisma.career.findUnique({
                where: { id: parseInt(careerId) },
            });
            return {
                careerId: parseInt(careerId),
                careerName: career ? career.name : 'Unknown',
                count: numericCount,
                percentage: Math.round((numericCount / totalAnswers) * 100),
            };
        }));
        result.sort((a, b) => b.percentage - a.percentage);
        return {
            totalAnswers,
            careerMatches: result,
        };
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = CalculatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map
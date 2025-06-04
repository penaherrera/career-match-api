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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    prismaService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async signUp(name, email, password) {
        const user = await this.prismaService.user.findFirst({ where: { email } });
        if (user) {
            this.logger.error(`User already has an account`);
            throw new common_1.ConflictException(`User already has an account`);
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
    async login(email, password) {
        const user = await this.prismaService.user.findFirst({ where: { email } });
        if (!user) {
            this.logger.error(`User does not have an account`);
            throw new common_1.ConflictException(`User does not have an account`);
        }
        if (user.password !== password) {
            this.logger.error(`Invalid credentials`);
            throw new common_1.UnauthorizedException(`Invalid credentials`);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnswersModule = void 0;
const common_1 = require("@nestjs/common");
const user_answers_service_1 = require("./services/user-answers.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_answers_controller_1 = require("./user-answers.controller");
const calculator_service_1 = require("./services/calculator.service");
let UserAnswersModule = class UserAnswersModule {
};
exports.UserAnswersModule = UserAnswersModule;
exports.UserAnswersModule = UserAnswersModule = __decorate([
    (0, common_1.Module)({
        providers: [user_answers_service_1.UserAnswersService, prisma_service_1.PrismaService, calculator_service_1.CalculatorService],
        controllers: [user_answers_controller_1.UserAnswersController],
    })
], UserAnswersModule);
//# sourceMappingURL=user-answers.module.js.map
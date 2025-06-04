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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnswersController = void 0;
const common_1 = require("@nestjs/common");
const user_answers_service_1 = require("./services/user-answers.service");
const calculator_service_1 = require("./services/calculator.service");
let UserAnswersController = class UserAnswersController {
    userAnswersService;
    calculatorService;
    constructor(userAnswersService, calculatorService) {
        this.userAnswersService = userAnswersService;
        this.calculatorService = calculatorService;
    }
    create(body) {
        return this.userAnswersService.create(body.userId, body.answerId);
    }
    async getCareerPercentages(userId) {
        return this.calculatorService.calculateCareerPercentages(userId);
    }
};
exports.UserAnswersController = UserAnswersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAnswersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserAnswersController.prototype, "getCareerPercentages", null);
exports.UserAnswersController = UserAnswersController = __decorate([
    (0, common_1.Controller)('user-answers'),
    __metadata("design:paramtypes", [user_answers_service_1.UserAnswersService,
        calculator_service_1.CalculatorService])
], UserAnswersController);
//# sourceMappingURL=user-answers.controller.js.map
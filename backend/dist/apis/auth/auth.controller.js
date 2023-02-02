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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const bcrypt = require("bcrypt");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(authDto, res) {
        const { email, password } = authDto;
        const user = await this.userService.findOne({ email });
        if (!user)
            throw new common_1.UnprocessableEntityException('일치하는 이메일이 없습니다.');
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new common_1.UnprocessableEntityException('암호가 틀렸습니다.');
        this.authService.setRefreshToken({ user, res });
        return this.authService.getAccessToken({ user });
    }
    restoreAccessToken(req) {
        return this.authService.getAccessToken({ user: req.user });
    }
    async logoinGoogle(req, res) {
        const { email, password } = req.user;
        let user = await this.userService.findOne({ email: req.user.email });
        if (!user) {
            user = await this.userService.create({
                email,
                password,
            });
        }
        this.authService.setRefreshToken({ user, res });
        res.redirect('http://localhost:3001');
    }
    async logoinKakao(req, res) {
        const { email, password } = req.user;
        let user = await this.userService.findOne({ email: req.user.email });
        if (!user) {
            user = await this.userService.create({
                email,
                password,
            });
        }
        this.authService.setRefreshToken({ user, res });
        res.redirect('http://localhost:3001');
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/restore'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('refresh')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "restoreAccessToken", null);
__decorate([
    (0, common_1.Get)('/login/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoinGoogle", null);
__decorate([
    (0, common_1.Get)('/login/kakao'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoinKakao", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
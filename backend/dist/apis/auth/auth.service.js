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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/jwt/dist");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    getAccessToken({ user }) {
        return this.jwtService.sign({ email: user.email, sub: user.id }, { secret: 'myAccessKey', expiresIn: '1h' });
    }
    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign({ email: user.email, sub: user.id }, { secret: 'myRefreshKey', expiresIn: '2w' });
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; SameSite=None; Secure; httpOnly;`);
    }
    async loginOAuth({ req, res }) {
        const { email, password } = req.user;
        let user = await this.userService.findOne({ email: req.user.email });
        if (!user) {
            user = await this.userService.create({
                email,
                password,
            });
        }
        this.setRefreshToken({ user, res });
        res.redirect('http://localhost:3001/profile');
        return this.getAccessToken({ user });
    }
    async logout({ res }) {
        res.removeHeader('authorization');
        res.cookie('refreshToken', '', {
            maxAge: 0,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
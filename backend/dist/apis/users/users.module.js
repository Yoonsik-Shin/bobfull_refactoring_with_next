"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_profile_entity_1 = require("./entities/user.profile.entity");
const jwt_access_strategy_1 = require("../../commons/auth/jwt-access.strategy");
const user_profile_img_entity_1 = require("./entities/user.profile.img.entity");
const file_service_1 = require("../file/file.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_options_1 = require("../../commons/utils/multer.options");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_profile_entity_1.UserProfile, user_profile_img_entity_1.UserProfileImg]),
            platform_express_1.MulterModule.registerAsync({
                useFactory: multer_options_1.multerOptionsFactory,
            }),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            file_service_1.FileService,
            jwt_access_strategy_1.JwtAccessStrategy,
        ],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map
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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_profile_entity_1 = require("./entities/user.profile.entity");
const user_profile_img_entity_1 = require("./entities/user.profile.img.entity");
let UsersService = class UsersService {
    constructor(userRepository, userProfileRepository, userProfileImgRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.userProfileImgRepository = userProfileImgRepository;
    }
    async create(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (user)
            throw new common_1.ConflictException('이미 등록된 이메일입니다.');
        const userProfileSave = await this.userProfileRepository.save({});
        const userImgSave = await this.userProfileImgRepository.save({});
        const userSave = await this.userRepository.save({
            email,
            password,
            userProfile: userProfileSave,
            userProfileImg: userImgSave,
        });
        return userSave;
    }
    async imgUpload({ email, profileImage }) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['userProfile', 'userProfileImg'],
        });
        const userImgSave = await this.userProfileImgRepository.update({ id: user.userProfileImg.id }, { profileImage });
        console.log(userImgSave);
        return user;
    }
    async findOne({ email }) {
        return await this.userRepository.findOne({
            where: { email },
            relations: ['userProfile', 'userProfileImg'],
        });
    }
    findAll() {
        return `This action returns all users`;
    }
    update(id) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    profileImgUpload() { }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(user_profile_img_entity_1.UserProfileImg)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
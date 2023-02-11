/// <reference types="multer-s3" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService } from '../file/file.service';
export declare class UsersController {
    private readonly usersService;
    private readonly fileService;
    constructor(usersService: UsersService, fileService: FileService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        userProfile: import("./entities/user.profile.entity").UserProfile;
    } & import("./entities/user.entity").User>;
    fetchUser(req: any): Promise<import("./entities/user.entity").User>;
    uploadProfileImg(file: Express.MulterS3.File, req: any): Promise<{
        userProfileImg: {
            profileImage: any;
        } & import("./entities/user.profile.img.entity").UserProfileImg;
        id: string;
        email: string;
        password: string;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        userProfile: import("./entities/user.profile.entity").UserProfile;
    } & import("./entities/user.entity").User>;
}

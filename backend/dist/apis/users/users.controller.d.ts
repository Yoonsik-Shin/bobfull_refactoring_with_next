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
        userProfileImg: import("./entities/user.profile.img.entity").UserProfileImg;
    } & import("./entities/user.entity").User>;
    fetchUser(req: any): Promise<import("./entities/user.entity").User>;
    uploadProfileImg(file: Express.MulterS3.File, req: any): Promise<import("./entities/user.entity").User>;
}

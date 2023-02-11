import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user.profile.entity';
import { UserProfileImg } from './entities/user.profile.img.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly userProfileRepository;
    private readonly userProfileImgRepository;
    constructor(userRepository: Repository<User>, userProfileRepository: Repository<UserProfile>, userProfileImgRepository: Repository<UserProfileImg>);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        userProfile: UserProfile;
    } & User>;
    imgUpload({ email, profileImage }: {
        email: any;
        profileImage: any;
    }): Promise<{
        userProfileImg: {
            profileImage: any;
        } & UserProfileImg;
        id: string;
        email: string;
        password: string;
        nickname: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        userProfile: UserProfile;
    } & User>;
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    findAll(): string;
    update(id: number): string;
    remove(id: number): string;
    profileImgUpload(): void;
}

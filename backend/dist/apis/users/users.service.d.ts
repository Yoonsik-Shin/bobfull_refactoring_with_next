import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user.profile.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly userProfileRepository;
    constructor(userRepository: Repository<User>, userProfileRepository: Repository<UserProfile>);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        userprofile: UserProfile;
    } & User>;
    findAll(): string;
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    update(id: number): string;
    remove(id: number): string;
    profileImgUpload(): void;
}

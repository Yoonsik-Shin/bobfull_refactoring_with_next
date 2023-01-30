import { UserProfile } from '../entities/user.profile.entity';
export declare class CreateUserDto {
    email: string;
    password: string;
    userProfile: UserProfile;
}

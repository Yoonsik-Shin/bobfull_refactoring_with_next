import { UserProfile } from './user.profile.entity';
import { UserProfileImg } from './user.profile.img.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    userProfile: UserProfile;
    userProfileImg: UserProfileImg;
}

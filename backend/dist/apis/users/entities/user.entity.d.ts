import { UserProfile } from './user.profile.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    userprofile: UserProfile;
}

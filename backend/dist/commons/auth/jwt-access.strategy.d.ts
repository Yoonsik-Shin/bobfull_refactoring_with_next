import { Strategy } from 'passport-jwt';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfile } from 'src/apis/users/entities/user.profile.entity';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly userRepositiory;
    private readonly userProfileRepository;
    constructor(userRepositiory: Repository<User>, userProfileRepository: Repository<UserProfile>);
    validate(payload: any): Promise<User>;
}
export {};

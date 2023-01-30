import { Strategy } from 'passport-jwt';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly userRepositiory;
    constructor(userRepositiory: Repository<User>);
    validate(payload: any): Promise<User>;
}
export {};

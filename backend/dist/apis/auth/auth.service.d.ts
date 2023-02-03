import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UsersService);
    getAccessToken({ user }: {
        user: any;
    }): string;
    setRefreshToken({ user, res }: {
        user: any;
        res: any;
    }): void;
    loginOAuth({ req, res }: {
        req: any;
        res: any;
    }): Promise<void>;
}

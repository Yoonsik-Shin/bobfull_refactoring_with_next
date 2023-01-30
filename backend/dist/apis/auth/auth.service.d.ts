import { JwtService } from '@nestjs/jwt/dist';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getAccessToken({ user }: {
        user: any;
    }): string;
}

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
interface IOAuthUser {
    user: Pick<User, 'email' | 'password'>;
}
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    login(authDto: AuthDto, res: any): Promise<string>;
    restoreAccessToken(req: any): string;
    logoinGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};

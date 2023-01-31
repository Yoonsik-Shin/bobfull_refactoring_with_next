import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        userprofile: import("./entities/user.profile.entity").UserProfile;
    } & import("./entities/user.entity").User>;
    fetchUser(req: any): Promise<import("./entities/user.entity").User>;
}

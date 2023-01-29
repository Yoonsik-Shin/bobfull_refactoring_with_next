import { IsString } from 'class-validator';
import { UserProfile } from '../entities/user.profile.entity';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  userProfile: UserProfile;
}

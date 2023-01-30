import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UsersService,
  ) {}

  @Post()
  async login(@Body() authDto: AuthDto) {
    const { email, password } = authDto;

    // 1. 로그인 (이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ email });

    // 2. 일치하는 유저가 없을때
    if (!user)
      throw new UnprocessableEntityException('일치하는 이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀릴때
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 모두 일치하면, accessToken(JWT)을 브라우저에 전송
    return this.authService.getAccessToken({ user });
  }
}
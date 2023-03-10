import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
  Res,
  Req,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password'>;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UsersService,
  ) {}

  @Post('/login')
  async login(
    @Body() authDto: AuthDto, //
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = authDto;

    // 1. 로그인 (이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ email });

    // 2. 일치하는 유저가 없을때
    if (!user)
      throw new UnprocessableEntityException('일치하는 이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀릴때
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res });

    // 5. 모두 일치하면, accessToken(JWT)을 브라우저에 전송
    return this.authService.getAccessToken({ user });
  }

  @Post('/restore')
  @UseGuards(AuthGuard('refresh'))
  restoreAccessToken(
    @Req() req: Request, //
  ) {
    return this.authService.getAccessToken({ user: req.user });
  }

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authService.loginOAuth({ req, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authService.loginOAuth({ req, res });
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authService.loginOAuth({ req, res });
  }

  @Post('/logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, //
  ) {
    return this.authService.logout({ res });
  }
}

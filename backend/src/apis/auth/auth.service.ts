import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UsersService,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 로컬
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; SameSite=None;`,
    // );
    // res.send();

    // 배포환경
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // front
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; SameSite=None; Secure; httpOnly;`,
    );
  }

  async loginOAuth({ req, res }) {
    const { email, password } = req.user;

    // 1. 가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 가입되어있지 않으면, 회원가입
    if (!user) {
      user = await this.userService.create({
        email,
        password,
      });
    }

    // 3. 로그인
    this.setRefreshToken({ user, res });

    res.redirect('http://localhost:3001');

    return this.getAccessToken({ user });
  }
}

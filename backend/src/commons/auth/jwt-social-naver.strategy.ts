import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile) {
    console.log(profile);
    const user = {
      email: profile._json.email,
      password: await bcrypt.hash(profile.id, 10),
    };

    return user;
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import * as bcrypt from 'bcrypt';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken, refreshToken, profile) {
    const profileJson = profile._json;
    const user = {
      email:
        profileJson.kakao_account.has_email &&
        !profileJson.kakao_account.email_needs_agreement
          ? profileJson.kakao_account
          : `${profile.provider}${profile.id}@kakao.com`,
      password: await bcrypt.hash(String(profile.id), 10),
    };
    return user;
  }
}

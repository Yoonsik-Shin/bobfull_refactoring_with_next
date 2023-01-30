import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        try {
          const cookieDummy = req.headers.cookie;
          console.log(cookieDummy + '111');
          const cookies = cookieDummy.split(';');
          console.log(cookies + '222');
          const [filterRefreshToken] = cookies.filter((el) =>
            el.includes('refreshToken'),
          );
          const refreshToken = filterRefreshToken
            .trim()
            .replace('refreshToken=', '');

          return refreshToken;
        } catch (error) {
          console.error('쿠키가 존재하지 않습니다.');
        }
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}

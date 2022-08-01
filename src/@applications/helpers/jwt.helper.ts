import { Injectable, UnauthorizedException } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';
import { ENV } from 'src/ENV';

const JWT_SECRET: string = ENV.JWT_SECRET;
@Injectable()
export class JWTHelper {
  public extractToken(headers: any) {
    let token: string =
      headers && headers.authorization ? headers.authorization : '';
    token = token.replace(/Bearer\s+/gm, '');
    return token;
  }

  //! JWT Sign
  public async sign(payload: any, options: any) {
    return sign(payload, JWT_SECRET, options);
  }

  public async verify(token: string) {
    try {
      return verify(token, JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Unauthorized Access Detected');
    }
  }

  //! JWT MakeAccessToken
  public async makeAccessToken(data: any) {
    const configAccess = {
      payload: {
        ...data,
      },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.EXPIRES_IN,
      },
    };
    const token = await this.sign(configAccess.payload, configAccess.options);
    const tokenData = decode(token);
    // const exp = tokenData.exp;
    return { token };
  }

  //! JWT MakeRefreshToken
  public async makeRefreshToken(data: any) {
    const configAccess = {
      payload: {
        ...data,
      },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN,
      },
    };
    const token = await this.sign(configAccess.payload, configAccess.options);
    const tokenData = decode(token);
    // const exp = tokenData.exp;
    return { token };
  }

  public async makePermissionToken(permissions: String[]) {
    const configAccess = {
      payload: { permissions },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.EXPIRES_IN,
      },
    };
    const token = await this.sign(configAccess.payload, configAccess.options);
    const tokenData = decode(token);
    // const exp = tokenData.exp;
    return token;
  }
}

import { Injectable } from '@nestjs/common';
import { BcryptHelper } from 'src/@applications/helpers/bcrypt.helper';
import { JWTHelper } from 'src/@applications/helpers/jwt.helper';
import { User } from 'src/@modules/users/entities/user.entity';
import { UserService } from 'src/@modules/users/services/user.service';
import { ENV } from 'src/ENV';
import {
  GenerateKeyOrCode, IsValidBDPhoneNumber,
  IsValidEmail
} from 'utils-friendly';
import { ForgotPasswordDTO } from '../dtos/forgetPasswordOtpSend.dto';
import { ForgotPasswordOTPVerifyDTO } from '../dtos/forgetPasswordOtpVerify.dto';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthOtpService } from './authOtp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: AuthOtpService,
    protected readonly bcryptHelper: BcryptHelper,
    private readonly jwtHelper: JWTHelper,
  ) { }

  async register(_payload: RegisterDto): Promise<any> {
    try {
      const payload: any = { ..._payload };
      if (IsValidBDPhoneNumber(payload?.identifier)) {
        payload.phoneNumber = payload?.identifier;
      } else if (IsValidEmail(payload?.identifier)) {
        payload.email = payload?.identifier;
      } else {
        throw new Error('Invalid Identifiers !');
      }
      const user: User = await this.userService.checkIfUserExist(
        payload.identifier,
      );
      if (user) {
        throw new Error('User Already Exist');
      }
      delete payload.identifier;
      const createdUser = await this.userService.createUser(payload);
      if (!createdUser) {
        throw new Error('Registration Error');
      }
      delete createdUser.rawPassword;
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async login(payload: LoginDTO): Promise<any> {
    const user: User = await this.userService.checkIfUserExist(
      payload.identifier,
    );

    if (!user) {
      throw new Error('User Not Exist');
    }

    const isPassCorrect = await this.bcryptHelper.compareHash(
      payload.password,
      user.password,
    );

    if (!isPassCorrect) {
      throw new Error('Invalid Password');
    }

    const tokenPayload = {
      ...user,
    };
    const refreshTokenPayload = {
      id: user.id,
      isRefreshToken: true,
    };

    delete user.password;

    const token = await (
      await this.jwtHelper.makeAccessToken(tokenPayload)
    ).token;
    const refreshToken = await (
      await this.jwtHelper.makeRefreshToken(refreshTokenPayload)
    ).token;

    return { token, refreshToken, user };
  }

  async forgotPasswordOTPSend(body: ForgotPasswordDTO): Promise<any> {
    try {
      if (
        !IsValidBDPhoneNumber(body?.identifier) &&
        !IsValidEmail(body?.identifier)
      ) {
        throw new Error('Invalid Identifiers !');
      }
      const isUserExist: User = await this.userService.checkIfUserExist(
        body.identifier,
      );
      if (!isUserExist) {
        throw new Error('User Not Exist');
      }
      const otp = String(GenerateKeyOrCode(6));
      const response: any = {
        otp,
        message: `OTP Sent to ${body.identifier}`,
      };
      if (IsValidBDPhoneNumber(body.identifier)) {
        await this.otpService.createOrUpdate(body.identifier, otp);
        // await this.messageAnalyticaService.sendOTP({
        //   smsbody: `Your OTP : ${otp.toString()}.Thanks From Loox.com.bd`,
        //   recipient: body.identifier,
        // });
        //   throw new Error('Contact with IT Support to get access throw Email!');
      } else if (IsValidEmail(body.identifier)) {
        throw new Error('Contact with IT Support to get access throw Email!');
      } else {
        throw new Error('Provide the Email / Phone Number you registered with');
      }

      if (!ENV.isDevelopment && !ENV.isStaging) {
        delete response.otp;
      }

      return response;
    } catch (error) {
      return error;
    }
  }

  async forgotPasswordOTPVerify(payload: ForgotPasswordOTPVerifyDTO) {
    let isExist;
    if (IsValidBDPhoneNumber(payload.identifier)) {
      isExist = await this.otpService.findOne({
        phoneNumber: payload.identifier,
        otp: payload.otp,
      });
    } else if (IsValidEmail(payload.identifier)) {
      isExist = await this.otpService.findOne({
        email: payload.identifier,
        otp: payload.otp,
      });
    } else {
      throw new Error('Invalid Identifiers');
    }

    if (!isExist) {
      throw new Error('Invalid OTP');
    }

    if (isExist.isExpired) {
      throw new Error('OTP Expired');
    }

    const user: User = await this.userService.checkIfUserExist(
      payload.identifier,
    );

    if (!user) {
      throw new Error('User not found');
    }

    delete user.password;

    await this.userService.update(
      { id: user.id },
      {
        password: payload.password,
      },
    );

    const tokenPayload = { ...user };
    const refreshTokenPayload = { id: user.id, isRefreshToken: true };
    // const resPayload = { ...user, permissions };

    await this.otpService.delete({
      phoneNumber: payload.identifier,
      otp: payload.otp,
    });

    const token = await (
      await this.jwtHelper.makeAccessToken(tokenPayload)
    ).token;
    const refreshToken = await (
      await this.jwtHelper.makeRefreshToken(refreshTokenPayload)
    ).token;

    return { token, refreshToken, user };
  }
}

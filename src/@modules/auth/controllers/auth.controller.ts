import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDTO } from '../dtos/forgetPasswordOtpSend.dto';
import { ForgotPasswordOTPVerifyDTO } from '../dtos/forgetPasswordOtpVerify.dto';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(public service: AuthService) { }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.service.register(registerDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDTO })
  async loginUser(@Body() body: LoginDTO): Promise<any> {
    return this.service.login(body);
  }

  @Post('forgot-password/otp/send')
  @ApiBody({ type: ForgotPasswordDTO })
  async forgotPasswordOTPSend(@Body() body: ForgotPasswordDTO): Promise<any> {
    return this.service.forgotPasswordOTPSend(body);
  }

  @Post('forgot-password/otp/verify')
  @ApiBody({ type: ForgotPasswordOTPVerifyDTO })
  async forgotPasswordOTPVerify(
    @Body() body: ForgotPasswordOTPVerifyDTO,
  ): Promise<any> {
    return this.service.forgotPasswordOTPVerify(body);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { AuthController } from './controllers/auth.controller';
import { AuthOtp } from './entities/authOtp.entity';
import { AuthService } from './services/auth.service';
import { AuthOtpService } from './services/authOtp.service';
import { AuthOtpSubscriber } from './subscribers/authOtp.subscriber';
const SUBSCRIBERS = [
  AuthOtpSubscriber,
];
@Module({
  imports: [TypeOrmModule.forFeature([AuthOtp]), CommonModule],
  providers: [AuthService, AuthOtpService, ...SUBSCRIBERS],
  exports: [AuthService, AuthOtpService],
  controllers: [AuthController,],
})
export class AuthModule { }

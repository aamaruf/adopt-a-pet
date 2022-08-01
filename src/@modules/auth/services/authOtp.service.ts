import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from 'nestjs-crud-utils';
import { ENV } from 'src/ENV';
import { IsValidBDPhoneNumber, IsValidEmail } from 'utils-friendly';
import { AuthOtp } from '../entities/authOtp.entity';

@Injectable()
export class AuthOtpService extends TypeOrmCrudService<AuthOtp> {

  constructor(@InjectRepository(AuthOtp) repo) {
    super(repo);
  }

  async createOrUpdate(identifier: string, otp: string): Promise<AuthOtp | any> {
    try {
      let isExist: AuthOtp = undefined;

      if (IsValidBDPhoneNumber(identifier)) {
        isExist = await this.findOne(
          { phoneNumber: identifier },
          {
            select: ['id', 'phoneNumber', 'otp', 'expiryDate'],
          }
        );
      } else if (IsValidEmail(identifier)) {
        isExist = await this.findOne(
          { email: identifier },
          {
            select: ['id', 'email', 'otp', 'expiryDate'],
          }
        );
      } else {
        throw new Error('Invalid Identifier');
      }

      if (isExist) {
        if (!ENV.isDevelopment && !ENV.isStaging) {
          if (!isExist.isExpired) {
            throw Error('Otp Already Sent To Your Number');
          }
        }
        return this.update({ id: isExist.id }, { otp });
      } else {
        if (IsValidBDPhoneNumber(identifier)) return this.save({ phoneNumber: identifier, otp });
        else if (IsValidEmail(identifier)) return this.save({ email: identifier, otp });
      }
    } catch (error) {
      throw Error(error)
    }
  }
}


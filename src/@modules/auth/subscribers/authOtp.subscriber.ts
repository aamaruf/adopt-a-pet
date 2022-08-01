import { InjectConnection } from '@nestjs/typeorm';
import { ENV } from 'src/ENV';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent, UpdateEvent
} from 'typeorm';
import { AuthOtp } from '../entities/authOtp.entity';

@EventSubscriber()
export class AuthOtpSubscriber implements EntitySubscriberInterface {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return AuthOtp;
  }

  async beforeInsert(event: InsertEvent<AuthOtp>) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + ENV.OTP_EXPIRES_IN);

    event.entity.expiryDate = date;
  }

  async beforeUpdate(event: UpdateEvent<AuthOtp>) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + ENV.OTP_EXPIRES_IN);

    event.entity.expiryDate = date;
  }

  async afterLoad(authOtp: AuthOtp) {
    const date = new Date();

    if (date > authOtp.expiryDate) {
      authOtp.isExpired = true;
    } else {
      authOtp.isExpired = false;
    }
  }
}

import { Module } from '@nestjs/common';
import { CommonModule } from './@modules/common/common.module';
import { PetModule } from './@modules/pets/pet.module';
import { UserModule } from './@modules/users/user.module';

@Module({
  imports: [CommonModule, PetModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

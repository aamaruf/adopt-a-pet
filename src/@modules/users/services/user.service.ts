import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "nestjs-crud-utils";
import { IsValidBDPhoneNumber, IsValidEmail } from 'utils-friendly';
import { User } from "../entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User>{
  constructor(
    @InjectRepository(User) repository
  ) {
    super(repository)
  }

  async checkIfUserExist(identifier: string): Promise<User | any> {
    try {
      let isUserExist = undefined;

      if (IsValidBDPhoneNumber(identifier)) {
        isUserExist = await this.findOne(
          { phoneNumber: identifier },
          {
            select: [
              'id',
              'name',
              'phoneNumber',
              'email',
              'password',
              'avatar',
            ],
          },
        );
      } else if (IsValidEmail(identifier)) {
        isUserExist = await this.findOne(
          { email: identifier },
          {
            select: [
              'id',
              'name',
              'phoneNumber',
              'email',
              'password',
              'avatar',
            ],
          },
        );
      } else {
        return false;
      }

      if (isUserExist) {
        return isUserExist;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async createUser(payload: User) {
    try {
      const newUser = await this.save<User>(payload);

      // await this.profileService.save({
      //   userId: newUser.id,
      // });

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

}

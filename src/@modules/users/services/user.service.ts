import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "nestjs-crud-utils";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User>{
  constructor(
    @InjectRepository(User) repository
  ) {
    super(repository)
  }

}

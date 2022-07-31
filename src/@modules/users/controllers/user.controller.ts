import {
  Controller
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud } from "nestjs-crud-utils";
import { dto } from "../dtos";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Crud({
  model: { type: User },
  dto,
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    sort: [{ field: 'createdAt', order: 'DESC' }],
    join: {
      pets: {
        eager: true,
        allow: ['id', 'name', 'species'],
      },
    },
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true,
    },
    // only: ['getManyBase', 'updateOneBase', 'replaceOneBase', 'deleteOneBase'],
    // exclude: [
    //   'createOneBase',
    //   'recoverOneBase',
    //   'createManyBase',
    //   'getOneBase',
    // ],
  },
})
@ApiTags('User')
@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {
    // super(service);
  }

}

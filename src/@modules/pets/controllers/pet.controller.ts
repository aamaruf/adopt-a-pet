import {
  Controller
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud } from "nestjs-crud-utils";
import { dto } from "../dtos";
import { Pet } from "../entities/pet.entity";
import { PetService } from "../services/pet.service";

@Crud({
  model: { type: Pet },
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
      user: {
        eager: true,
        allow: ['id', 'name', 'email'],
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
@ApiTags('Pet')
@Controller("pets")
export class PetController {
  constructor(private readonly service: PetService) {
    // super(service);
  }

}

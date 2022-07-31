import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "nestjs-crud-utils";
import { Pet } from "../entities/pet.entity";

@Injectable()
export class PetService extends TypeOrmCrudService<Pet>{
  constructor(
    @InjectRepository(Pet) repository
  ) {
    super(repository)
  }

}

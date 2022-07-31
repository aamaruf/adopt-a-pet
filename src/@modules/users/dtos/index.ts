import { DtoOptions } from "nestjs-crud-utils";
import { UserCreateDTO } from "./userCreate.dto";
import { UserUpdateDTO } from "./userUpdate.dto";


export const dto: DtoOptions = {
    // update: PetUpdateDTO, // for patch
    create: UserCreateDTO,
    replace: UserUpdateDTO,
};
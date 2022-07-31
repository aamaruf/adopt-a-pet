import { DtoOptions } from "nestjs-crud-utils";
import { PetCreateDTO } from "./petCreate.dto";
import { PetUpdateDTO } from "./petUpdate.dto";


export const dto: DtoOptions = {
    // update: PetUpdateDTO, // for patch
    create: PetCreateDTO,
    replace: PetUpdateDTO,
};
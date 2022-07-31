import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetController } from "./controllers/pet.controller";
import { Pet } from "./entities/pet.entity";
import { PetService } from "./services/pet.service";

const services = [
    PetService,

];
const controllers = [
    PetController,

];
const entities = [
    Pet,
];
const subscribers = [
];

@Module({
    imports: [TypeOrmModule.forFeature(entities),
    ],
    controllers: [...controllers],
    providers: [...services, ...subscribers],
    exports: [...services],
})
export class PetModule { }

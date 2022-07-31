import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENV } from "src/ENV";

@Module({
    imports: [TypeOrmModule.forRoot(ENV.db)],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule.forRoot(ENV.db)],
})
export class CommonModule { }
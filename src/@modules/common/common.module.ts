import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelperModule } from "src/@applications/helpers/helper.module";
import { ENV } from "src/ENV";
import { UserModule } from "../users/user.module";

@Module({
    imports: [TypeOrmModule.forRoot(ENV.db), HelperModule, UserModule],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule.forRoot(ENV.db), UserModule, HelperModule],
})
export class CommonModule { }
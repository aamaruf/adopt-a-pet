import { config } from "dotenv";
import * as path from "path";

export const ENV_DEVELOPMENT = "development";
export const ENV_STAGING = "staging";
export const ENV_PRODUCTION = "production";
config({
    path: path.join(
        process.cwd(),
        "environments",
        `${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}.env`
    ),
});


export const ENV = {


    PORT: 3000,
    API_PREFIX: "api/v1",
    API_TITLE: "Adopt a Pet",
    API_DESC: `Adopt a Pet is a simple REST API service to register users pet for adoption.`,
    API_VERSION: "1.0",


    db: {
        type: process.env.TYPEORM_CONNECTION as any,
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: process.env.TYPEORM_SYNCHRONIZE,
        logging: process.env.TYPEORM_LOGGING,
        autoLoadEntities: true
        //   entities: [join(__dirname, '../app/*/.entity{.ts,.js}')],
    }
}
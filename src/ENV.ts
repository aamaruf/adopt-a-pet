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


    PORT: process.env.PORT,
    API_PREFIX: "api/v1",
    API_TITLE: "Adopt a Pet",
    API_DESC: `Adopt a Pet is a simple REST API service to register users pet for adoption.`,
    API_VERSION: "1.0",

    isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
    isStaging: process.env.NODE_ENV === ENV_STAGING,
    isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

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
    },

    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    EXPIRES_IN: process.env.EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    OTP_EXPIRES_IN: +process.env.OTP_EXPIRES_IN,

    // external: {
    //     cf: {
    //         CF_R2_ENDPOINT: process.env.CF_R2_ENDPOINT,
    //     },
    // },
}
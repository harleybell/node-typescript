import {
    cleanEnv, port, str, num
} from 'envalid';
import { Environment } from "../interfaces/env";

export const validateEnv = () => {
    return cleanEnv<Environment>(process.env, {
        NODE_ENV: str(),
        TIMEOUT: num(),
        PORT: port({ default: 3000 }),
        MONGODB_URI: str()
    });
}
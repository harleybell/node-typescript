import { num, port, str } from "envalid";

export interface Environment {
    NODE_ENV: string,
    PORT: number,
    TIMEOUT: number,
    MONGODB_URI: string
}
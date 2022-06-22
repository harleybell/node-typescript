import dotenv from 'dotenv';
import App from './app';
import { validateEnv } from './utils/validateEnv';
import 'source-map-support/register'

dotenv.config({ path: '.env' });

const env = validateEnv();

const app = new App(env);

app.listen()
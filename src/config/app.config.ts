import dotenv from 'dotenv';
import { from } from 'env-var';

dotenv.config();

interface AppConfigInterface {
  APP_NAME: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USERNAME: string;
}
/**
 *
 */
export const AppConfig = (): AppConfigInterface => {
  const env = from(process.env);

  const validatedConfig = {
    APP_NAME: env.get('APP_NAME').required().asString(),
    DB_DATABASE: env.get('DB_DATABASE').required().asString(),
    DB_HOST: env.get('DB_HOST').required().asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
    DB_PORT: env.get('DB_PORT').required().asIntPositive(),
    DB_USERNAME: env.get('DB_USERNAME').required().asString(),
  };

  return validatedConfig;
};

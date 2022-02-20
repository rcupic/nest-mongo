import 'dotenv/config';

export interface IConfig {
  MONGO_URL: string;
  SEED_INGREDIENTS: boolean;
  NODE_ENV: 'dev' | 'qa' | 'production' | 'test';
}

export const config = {
  MONGO_URL: process.env.MONGO_URL,
  SEED_INGREDEINTS: process.env.SEED_INGREDIENTS === 'true',
  NODE_ENV: process.env.NODE_ENV,
};

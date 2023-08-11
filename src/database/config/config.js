import { config } from 'dotenv';
config();

export const development = {
  username: process.env.DATABASE_USER,
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE,
  host: 'localhost',
  dialect: 'mysql',
};
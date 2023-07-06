import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
};

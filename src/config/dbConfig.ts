import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL as string;
const isProduction = process.env.NODE_ENV === 'production';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
  dialect: 'postgres',
  ssl: isProduction,
  dialectOptions: {
    ssl: {
      require: isProduction,
      rejectUnauthorized: isProduction,
    },
  },
});

export default db;

import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ENV = process.env.NODE_ENV;

config({ path: ENV ? `.env.${ENV}` : '.env' });

const ormConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
  },
  synchronize: false,
  entities: [],
};
export default ormConfig;

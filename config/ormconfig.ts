import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

const ormConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // MSSQL-specific option
  },
  synchronize: false,
  entities: [],
};
export default ormConfig;

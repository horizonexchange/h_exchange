import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456789',
  database: 'auth_db',
  entities: [__dirname + '/src/entities/*.ts'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false,
});
import { DataSource } from 'typeorm';

import * as dotEnv from 'dotenv';

dotEnv.config({
  path: '.env',
});

export const dataSourceConfig = new DataSource({
  type: 'postgres',
  host: process.env['DATABASE_HOST'],
  port: parseInt(process.env['DATABASE_PORT']),
  username: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrationsRun: true,
  logging: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});

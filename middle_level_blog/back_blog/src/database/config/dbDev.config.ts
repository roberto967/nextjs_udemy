import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export function devDBConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_DATABASE'],
    migrations: [
      'src/database/migrations/*.ts', // para gerar em desenvolvimento
      'dist/src/database/migrations/*.js', // para rodar após build
    ],
    entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],

    // Apenas para desenvolvimento
    synchronize: true,
    migrationsRun: true,
    // ssl: process.env.DB_SSL === 'true'
    //   ? { rejectUnauthorized: false }
    //   : false,
  };
}

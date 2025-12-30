import { DataSource, DataSourceOptions } from 'typeorm';
import { devDBConfig } from './dbDev.config';
import { prodDBConfig } from './dbProd.config';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

const logger = new Logger('DatabaseConfig');

dotenv.config({
  path: `${process.env['NODE_ENV'] === 'development' ? '.env.development' : '.env'}`,
});

let options: DataSourceOptions;

if (process.env['NODE_ENV'] === 'development') {
  logger.verbose('Database config: Development');
  options = devDBConfig();
} else {
  logger.verbose('Database config: Production');
  options = prodDBConfig();
}

export default new DataSource(options);

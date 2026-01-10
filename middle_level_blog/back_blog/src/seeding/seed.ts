import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import dataSource from '../database/config';
import { MainSeeder } from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  ...dataSource.options,
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);

datasource
  .initialize()
  .then(async () => {
    await datasource.synchronize(false);
    await runSeeders(datasource);
    process.exit();
  })
  .catch(error => {
    console.error('Error during Data Source initialization or seeding:', error);
    process.exit(1);
  });

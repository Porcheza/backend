import { DataSource } from 'typeorm';
import typeormConfig from '../../../src/database/config/typeorm.config';

const datasource = new DataSource({
  ...typeormConfig,
});

export default datasource;

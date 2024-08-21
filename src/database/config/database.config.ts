import { registerAs } from '@nestjs/config';
import typeormConfig from './typeorm.config';

export default registerAs('database', () => {
  return {
    ...typeormConfig,
  };
});

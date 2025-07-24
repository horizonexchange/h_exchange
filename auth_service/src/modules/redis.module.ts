import { Global, Module, Provider } from '@nestjs/common';
import Redis from 'ioredis';

const redisProvider: Provider = {
  useFactory: () => {
    return new Redis({
      port: 6379,
      host: 'localhost',
      username: 'default',
      password: '12345678',
      db: 0,
    });
  },
  provide: 'REDIS_CLIENT',
};

@Global()
@Module({
  providers: [redisProvider],
  exports: [redisProvider],
})
export class RedisModule {}

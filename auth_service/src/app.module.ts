import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './modules/redis.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456789",
      database: "auth_db",
      entities: [__dirname + '/entities/*.entity.{ts,js}'],
      synchronize: false,
    }),
    RedisModule,
    UserModule,
  ],
})

export class AppModule {}
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Blog } from 'src/blog/entity/entity';

@Module({
   imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs',
 entities: [User, Blog],  // <- explicit entities
      synchronize: true,
    }),
  ],
  providers: [DatabaseService],
  controllers: [DatabaseController]
})
export class DatabaseModule {}

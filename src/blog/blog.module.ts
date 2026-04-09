import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Blog } from './entity/entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Blog])],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}

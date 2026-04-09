import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Blog } from 'src/blog/entity/entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User,Blog]),

 JwtModule.register({
      global: true,
      secret: "1234567",
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

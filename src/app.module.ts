import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CardModule } from './card/card.module';
import { HeroModule } from './hero/hero.module';
import { SectionModule } from './section/section.module';
import { BackendModule } from './backend/backend.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    DatabaseModule, CardModule, HeroModule, SectionModule, BackendModule, UserModule, BlogModule],
  controllers: [AppController], // HeroController already HeroModule me ho sakta hai
  providers: [AppService],      // HeroService yahan remove kar do
})
export class AppModule {}
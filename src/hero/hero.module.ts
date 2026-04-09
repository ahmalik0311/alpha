import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroEntity } from './entity/hero.entity';

@Module({
    imports:[TypeOrmModule.forFeature([HeroEntity])],
    providers:[HeroService],
    controllers:[HeroController]

})
export class HeroModule {
   
}

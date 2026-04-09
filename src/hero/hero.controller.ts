import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HeroEntity } from './entity/hero.entity';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
    constructor(private readonly heroService:HeroService){}

    @Post('/create')
    createHero(@Body() data:Partial<HeroEntity>){
        return this.heroService.addHero(data)
    }

    @Get('/')
    all(){
        return this.heroService.findAll()
    }

    @Post('/update/:id')
    updateHero(
        @Body() data:Partial<HeroEntity>,
        @Param('id') id:number
    ){
        return this.heroService.updateHero(data,id)
    }
}

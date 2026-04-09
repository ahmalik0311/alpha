import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entity/card.entity';

@Controller('card')
export class CardController {
    constructor(
        private readonly cardService:CardService
    ){}


    @Get('/')
    all(){
        return this.cardService.findAll()
    }


    @Post('/add')
    addData(@Body() data:Partial<Card>){
        return this.cardService.addData(data)
    }

    @Post('/update/:id')
    update(@Body() data:Partial<Card>, @Param('id') id:number){
        return this.cardService.update(data,id)
    }
}

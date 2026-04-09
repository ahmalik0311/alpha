import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Section } from './entity/section.entity';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
    constructor(
        private readonly sectionService:SectionService
    ){}



    @Get('/')
    find(){
        return this.sectionService.findOne()
    }

    @Post('/add')
    add(@Body() data:Partial<Section>){
        return this.sectionService.addData(data)
    }

    @Post('/update/:id')
    update(@Body() data:Partial<Section>,
    @Param() id:number){
        return this.sectionService.updateData(data,id)
    }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entity/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private sectionRepository:Repository<Section>
    ){}


    async findOne(){
        return this.sectionRepository.find()
    }
    async addData(data:Partial<Section>){
        const result = this.sectionRepository.create(data)
        return this.sectionRepository.save(data)
    }

    async updateData(data:Partial<Section>, id:number){
        const result = await this.sectionRepository.update(id,data)
        if(result.affected===0){
            throw new BadRequestException("No Record")
        }

        return result
    }




}

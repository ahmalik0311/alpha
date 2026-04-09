import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entity/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
   constructor(
     @InjectRepository(Card)
    private cardRepository:Repository<Card>
   ){}

   async findAll():Promise<Card[]>{
    return  this.cardRepository.find()
   }

  async addData(data: Partial<Card>): Promise<Card> {
  const newCard = this.cardRepository.create(data);
  return this.cardRepository.save(newCard);
}


async update(data: Partial<Card>, id: number) {
  const result = await this.cardRepository.update(id, data);

  if (result.affected === 0) {
    throw new BadRequestException("Card not found");
  }
  
  return this.cardRepository.findOne({ where: { id } });
}

}

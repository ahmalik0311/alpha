import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroEntity } from './entity/hero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(HeroEntity)
        private heroRepository:Repository<HeroEntity>
    ){}


    async findAll():Promise<HeroEntity[]>{
        return this.heroRepository.find()
    }

async addHero(data: Partial<HeroEntity>): Promise<HeroEntity> {
  if (data.isActive) {
    // deactivate all existing heroes
    await this.heroRepository.update({}, { isActive: false });
  }

  const newHero = this.heroRepository.create(data);
  return this.heroRepository.save(newHero);
}

    async updateHero(data: Partial<HeroEntity>, id: number): Promise<HeroEntity> {

  // agar isActive true hai to baaki sab false kar do
  if (data.isActive === true) {
    await this.heroRepository.update(
      { isActive: true },   // sirf active wale ko target karo
      { isActive: false }
    );
  }

  const result = await this.heroRepository.update(id, data);

  if (result.affected === 0) {
    throw new BadRequestException("Hero not found");
  }

  const updatedHero = await this.heroRepository.findOne({ where: { id } });

  if (!updatedHero) {
    throw new BadRequestException("Hero not found after update");
  }

  return updatedHero;
}

}

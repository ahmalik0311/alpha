import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entity/card.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([Card])
  ],
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}

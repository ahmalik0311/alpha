import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string ;

  @Column()
  content!: string;

  // Store array of objects as JSON
  @Column('simple-json', { nullable: true })
  other!: { title: string; content: string; imageSrc: string }[];

  @Column({ default: false })
  isActive!: boolean;
}
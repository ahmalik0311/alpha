import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HeroEntity {
  @PrimaryGeneratedColumn()
  id!: number;  // always assigned by DB

  @Column({ nullable: false })
  title!: string; // definite assignment assertion

  @Column({ nullable: false })
  content!: string; // definite assignment assertion

  @Column('simple-json', { nullable: true })
  button!: { 
    btnText: string; btnLink: string }; // single button, optional

  @Column({ default: false })
  isActive!: boolean; // default value provided
}
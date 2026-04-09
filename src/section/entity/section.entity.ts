import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('simple-json', { nullable: true })
    hero?: {
        title: string;
        content: string;
        isActive: boolean;
        btnText: string;
        btnLink: string;
    };

    @Column('simple-json', { nullable: true })
    about?: {
        title: string;
        content: string;
        isActive: boolean;
        btnText: string;
        btnLink: string;
        points: string[]; // or define a proper interface
    };
}
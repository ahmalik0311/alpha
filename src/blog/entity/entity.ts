import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    title!:string;

    @Column({nullable:false})
    content!:string

    @ManyToOne((type)=>User,(user)=>user.userBlog)
    user!:User
    
}
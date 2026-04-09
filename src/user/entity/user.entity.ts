import { Blog } from "src/blog/entity/entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    fullName!:string;

    @Column({unique:true,nullable:false})
    email!:string

    @Column()
    password!:string

    @OneToMany((type)=>Blog, (blog)=> blog.user,{cascade:true})
    userBlog!:Blog[]
    
}
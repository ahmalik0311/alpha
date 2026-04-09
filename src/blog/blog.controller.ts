import { Body, Controller, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entity/entity';

@Controller('blog')
export class BlogController {
    constructor(
           private readonly blogService:BlogService
       ){}


       @Post('/create/:id')
       create(@Body() data:Blog, @Param('id') id:number){
        return this.blogService.createBlog(data,id)
       }
   
}

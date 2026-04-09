import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entity/entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createBlog(data: Partial<Blog>, userId: number) {
    try {
      // Optionally check if the user exists
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error('User not found');
      
      const newBlog = this.blogRepository.create({
        ...data,
        user: { id: userId }, // link the blog to the user
      });

   return await this.blogRepository.save(newBlog);

      
    } catch (error) {
      console.error('Blog creation failed:', error);
      throw new InternalServerErrorException('Failed to create blog');
    }
  }
}
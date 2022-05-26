import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  //////// create new post
  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({
        data: createPostDto,
      });
      if (post) {
        return { status: true, data: post };
      }
    } catch (error) {}
  }

  ////////// find all posts
  async findAll() {
    try {
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  //////// get post
  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      return post;
    } catch (error) {}
  }

  /////// get posts of category
  async getCategoryPosts(id: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: { categoryId: id },
      });
      return posts;
    } catch (error) {}
  }

  //////// update post
  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
      return { status: true, data: updatedPost };
    } catch (error) {}
  }

  ///////// delete post
  async remove(id: number) {
    try {
      const deletedPost = await this.prisma.post.delete({ where: { id } });
      return { status: true, data: deletedPost };
    } catch (error) {}
  }
}

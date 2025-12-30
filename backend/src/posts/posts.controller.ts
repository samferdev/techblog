// src/posts/posts.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(AuthGuard('jwt')) // Protege a rota de criação
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    // req.user vem do JwtStrategy que fizemos antes!
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @Get() // Rota pública: qualquer um pode ler os posts
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: any, @Request() req) {
    return this.postsService.update(id, updatePostDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.postsService.remove(id, req.user.userId);
  }
}
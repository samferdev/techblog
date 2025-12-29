// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      author: userId, // Vincula o post ao usuário logado
    });
    return createdPost.save();
  }

  async findAll() {
    // O 'populate' troca o ID do autor pelos dados reais (nome e email)
    return this.postModel.find().populate('author', 'name email username').exec();
  }
}
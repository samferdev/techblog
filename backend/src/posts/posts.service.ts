// src/posts/posts.service.ts
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

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

  async update(id: string, updatePostDto: any, userId: string) {
    const post = await this.postModel.findById(id);

    if (!post) throw new NotFoundException('Post não encontrado');

    // Validação: O autor do post é o mesmo que está logado?
    if (post.author.toString() !== userId) {
      throw new ForbiddenException('Tu não tens permissão para editar este post, malandro!');
    }

    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string, userId: string) {
    const post = await this.postModel.findById(id);

    if (!post) throw new NotFoundException('Post não encontrado');

    // Validação de segurança
    if (post.author.toString() !== userId) {
      throw new ForbiddenException('Não podes apagar o que não é teu!');
    }

    return this.postModel.findByIdAndDelete(id);
  }
}
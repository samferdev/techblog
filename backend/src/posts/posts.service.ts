import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Comment, CommentDocument } from '../comments/schemas/comment.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) { }

  async create(createPostDto: CreatePostDto, userId: string) {
    const createdPost = new this.postModel({
      ...createPostDto,
      author: userId,
    });
    return createdPost.save();
  }

  async findAll() {
    const posts = await this.postModel
      .find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();

    return Promise.all(
      posts.map(async (post) => {
        // Converte o ID para string e depois para ObjectId para não ter erro de tipo
        const count = await this.commentModel.countDocuments({
          post: new Types.ObjectId(post._id.toString())
        });

        return {
          ...post.toObject(),
          commentCount: count,
        };
      }),
    );
  }

  async update(id: string, updatePostDto: any, userId: string) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post não encontrado');
    if (post.author.toString() !== userId) throw new ForbiddenException('Ação proibida');
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string, userId: string) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post não encontrado');
    if (post.author.toString() !== userId) throw new ForbiddenException('Ação proibida');
    return this.postModel.findByIdAndDelete(id);
  }
}
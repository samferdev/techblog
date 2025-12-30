import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) { }

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const newComment = new this.commentModel({
      content: createCommentDto.content,
      post: new Types.ObjectId(createCommentDto.postId),
      author: new Types.ObjectId(userId),
    });
    return newComment.save();
  }

  async findByPost(postId: string) {
    return this.commentModel
      .find({ post: new Types.ObjectId(postId) })
      .populate('author', 'username')
      .exec();
  }

  async update(id: string, content: string, userId: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment) throw new NotFoundException('Comentário não encontrado');

    if (comment.author.toString() !== userId) {
      throw new ForbiddenException('Tu não podes editar o comentário dos outros!');
    }

    return this.commentModel.findByIdAndUpdate(id, { content }, { new: true });
  }

  async remove(id: string, userId: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment) throw new NotFoundException('Comentário não encontrado');

    if (comment.author.toString() !== userId) {
      throw new ForbiddenException('Não tens permissão para apagar este comentário!');
    }

    return this.commentModel.findByIdAndDelete(id);
  }
}
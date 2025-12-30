import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const newComment = new this.commentModel({
      content: createCommentDto.content,
      post: createCommentDto.postId,
      author: userId,
    });
    return newComment.save();
  }

  async findByPost(postId: string) {
    return this.commentModel
      .find({ post: postId })
      .populate('author', 'username avatarUrl') // Traz quem comentou
      .exec();
  }
}
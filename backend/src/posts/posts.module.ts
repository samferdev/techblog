import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './schemas/post.schema';
import { Comment, CommentSchema } from '../comments/schemas/comment.schema'; // Import aqui

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema }, // ESSA LINHA É O SEGREDO
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
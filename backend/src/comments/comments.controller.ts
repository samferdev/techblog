import { Controller, Post, Body, Get, Param, UseGuards, Request, Patch, Delete } from '@nestjs/common'
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto, req.user.userId);
  }

  @Get('post/:postId')
  findAllByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body('content') content: string, @Request() req) {
    return this.commentsService.update(id, content, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(id, req.user.userId);
  }
}
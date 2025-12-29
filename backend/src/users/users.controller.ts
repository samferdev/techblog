import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Rota base: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post() // Verbo HTTP POST
  create(@Body() createUserDto: CreateUserDto) {
    // O @Body já passou pela validação do DTO automaticamente antes de chegar aqui
    return this.usersService.create(createUserDto);
  }
}
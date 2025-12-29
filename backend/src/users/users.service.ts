
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const extingingUser = await this.userModel.findOne({
      $and: [{ email: createUserDto.email }, { username: createUserDto.username }]
    });

    if (extingingUser) {
      throw new BadRequestException('Usuário com esse email já está cadastrado');
    }

    const passwordHashed = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: passwordHashed
    });

    return createdUser.save();
  }
}

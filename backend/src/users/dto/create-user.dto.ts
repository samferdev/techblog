import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'O nome do usuário deve ser um texto' })
    @MinLength(3, { message: 'O nome do usuário deve ter no mínimo 3 caracteres)' })
    @IsNotEmpty({ message: 'O nome do usuário não pode estar vazio' })
    username: string;

    @IsEmail({}, { message: 'O email deve ser um email válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}

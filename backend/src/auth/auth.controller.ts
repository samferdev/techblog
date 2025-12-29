import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define a rota base como /auth
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK) // Retorna status 200 em vez de 201 (padrão para login)
    async login(@Body() body: any) {
        console.log('Tentativa de login para o email:', body.email);

        // 1. Chama o serviço para validar o usuário e a senha
        const user = await this.authService.validateUser(body.email, body.password);

        // 2. Se as credenciais estiverem erradas, lança um erro 401
        if (!user) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        // 3. Se estiver tudo ok, gera e retorna o Token JWT
        return this.authService.login(user);
    }
}
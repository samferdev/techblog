import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        // Tipamos explicitamente como UserDocument para liberar o .toObject()
        const user = await this.usersService.findByEmail(email) as UserDocument | null;

        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                // Agora o TS reconhece o método toObject
                const { password, ...result } = user.toObject();
                return result;
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }
}
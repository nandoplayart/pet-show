import { JwtPayload } from '../../../../shared/interfaces/JwtPayload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){

    }

    async createToken(document,email,image,roles: string[]):Promise<string>{
        const user: JwtPayload = {
            document: document,
            email: email,
            image: image,
            roles: roles
        };
        return this.jwtService.signAsync(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        // return await this.accountService.findOneByUsername(payload.username);
        return payload;
    }

}

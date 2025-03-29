import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        private usersService:UsersService
    ){}

    async login(email:string,password:string){
        try {
            const user = await this.usersService.findUserByEmail(email)
            if(!user || !(await argon2.verify(user.password,password))){
                throw new UnauthorizedException("invalid credentials")
            }

            const payload = {sub:user.id,email:user.email,role:user.role};
            return {
                access_token : this.jwtService.sign(payload)
            }
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}

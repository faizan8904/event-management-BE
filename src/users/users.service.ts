import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {
    constructor(private prismaService : PrismaService){}

    async createUser(dto:CreateUserDto){

        try{
            const hashPassword = await argon2.hash(dto.password)

            return await this.prismaService.user.create(
                {
                    data:{
                        email:dto.email,
                        password:hashPassword,
                        role:dto.role || 'ATTENDEE'
                    }
                }
            )

            
        }
        catch(error){
            throw new BadRequestException(error)
        }
    }

    async getUser(id:string){
       
        try{
            return await this.prismaService.user.findUnique(
                {
                    where:{
                        id
                    },
                    include:{
                        events:true,
                        tickets:true
                    }
                }
            )
        }
        catch(error){
            throw new BadRequestException(error)
        }
       
    }

    async getAllUser(){
        try {
            return await this.prismaService.user.findMany()
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

}

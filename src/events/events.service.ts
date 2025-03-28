import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {

    constructor(private prisma:PrismaService){}

    async createEvent(dto:CreateEventDto, organizerId:string){
        try{
            return this.prisma.event.create({
                data:{
                    title:dto.title,
                    description:dto.description,
                    date:new Date(dto.date),
                    venue:dto.venue,
                    organizerId
                }
            })
        }
        catch(error){
            throw new BadRequestException(error)
        }
    }

    async getEvent(id:string){
        try {
            return await this.prisma.event.findMany({
                where:{id},
                include:{tickets:true}
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getAllEvents(){
        try {
            return await this.prisma.event.findMany({
                include:{tickets:true}
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}

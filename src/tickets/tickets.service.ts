import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(private prisma:PrismaService){}

    async createTicket(dto:CreateTicketDto){
        try {
            return this.prisma.ticket.create({
                data:{
                    eventId:dto.eventId,
                    userId:dto.userId,
                    price:dto.price,
                    status:'PENDING'
                }
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getTicket(id:string){
        try {
            return this.prisma.ticket.findUnique({
                where:{id},
                include:{event:true,user:true}
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getAllTickets(){
        try {
            return this.prisma.ticket.findMany({
                include:{event:true,user:true}
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}

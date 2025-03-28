import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TicketsController],
  providers: [PrismaService,TicketsService]
})
export class TicketsModule {}

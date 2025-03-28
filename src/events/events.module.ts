import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventsController],
  providers: [PrismaService,EventsService]
})
export class EventsModule {}

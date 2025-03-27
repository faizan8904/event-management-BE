import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [UsersModule, EventsModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, EventsModule, TicketsModule, AuthModule,ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: '.env',
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

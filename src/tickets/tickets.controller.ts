import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/rbac.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@ApiTags('tickets')
@Controller('tickets')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ORGANIZER', 'ADMIN')
  @Post()
  @ApiResponse({ status: 201, description: 'Ticket created' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ORGANIZER', 'ADMIN')
  @Get()
  @ApiResponse({ status: 200, description: 'List of tickets' })
  getAll() {
    return this.ticketsService.getAllTickets();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ORGANIZER', 'ADMIN')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ticket details' })
  getOne(@Param('id') id: string) {
    return this.ticketsService.getTicket(id);
  }
}
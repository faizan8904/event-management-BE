import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('tickets')
@Controller('tickets')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Ticket created' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of tickets' })
  getAll() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ticket details' })
  getOne(@Param('id') id: string) {
    return this.ticketsService.getTicket(id);
  }
}
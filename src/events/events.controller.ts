import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/rbac.guard';

@ApiTags("events")
@Controller('events')
@UsePipes(new ValidationPipe({whitelist:true}))
export class EventsController {

    constructor(private readonly eventsService:EventsService){}

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ORGANIZER', 'ADMIN')
    @Post('create')
    @ApiResponse({ status: 201, description: 'Event created' })
    create(@Req() request: Request & { user:{userId:string}},@Body() createEventDto: CreateEventDto){
        return this.eventsService.createEvent(createEventDto,request.user.userId)
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ORGANIZER', 'ADMIN')
    @Get()
    @ApiResponse({status:200,description:"List of events"})
    getAll(){
        return this.eventsService.getAllEvents()
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ORGANIZER', 'ADMIN')
    @Get(':id')
    @ApiResponse({status:200,description:"Event details"})
    getOne(@Param('id') idd:string){
        return this.eventsService.getEvent(idd)
    }

}

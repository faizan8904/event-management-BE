import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags("events")
@Controller('events')
@UsePipes(new ValidationPipe({whitelist:true}))
export class EventsController {

    constructor(private readonly eventsService:EventsService){}

    @Post('create')
    @ApiResponse({ status: 201, description: 'Event created' })
    create(@Body() createEventDto: CreateEventDto){
        return this.eventsService.createEvent(createEventDto,'cm8sk346p0001hzuwu7w5tgnz')
    }

    @Get()
    @ApiResponse({status:200,description:"List of events"})
    getAll(){
        return this.eventsService.getAllEvents()
    }

    @Get(':id')
    @ApiResponse({status:200,description:"Event details"})
    getOne(@Param('id') idd:string){
        return this.eventsService.getEvent(idd)
    }

}

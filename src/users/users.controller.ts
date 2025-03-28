import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
@UsePipes(new ValidationPipe({whitelist:false }))
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Post("create")
    @ApiResponse({status:200,description:"User created!"})
    create(@Body() dto:CreateUserDto){
        return this.usersService.createUser(dto)
    }

    @Get()
    @ApiResponse({status:200,description:"List Of Users"})
    getAll(){
        return this.usersService.getAllUser()
    }

    @Get(":id")
    @ApiResponse({status:200,description:"Single User"})
    getOne(@Param("id") idd:string){
        return this.usersService.getUser(idd)
    }

}

import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guards/rbac.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

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

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ORGANIZER', 'ADMIN')
    @Get()
    @ApiResponse({status:200,description:"List Of Users"})
    getAll(){
        return this.usersService.getAllUser()
    }


    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ORGANIZER', 'ADMIN')
    @Get(":id")
    @ApiResponse({status:200,description:"Single User"})
    getOne(@Param("id") idd:string){
        return this.usersService.getUser(idd)
    }

}

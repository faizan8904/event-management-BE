import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"





export class CreateUserDto {
    

    @ApiProperty({ example: 'test@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty({example:'1234'})
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password:string

    @ApiProperty({ example: 'ATTENDEE', enum: ['ADMIN', 'ORGANIZER', 'ATTENDEE'], required: false })
    @IsEnum(['ADMIN','ORGANIZER','ATTENDEE'])
    role?:'ADMIN' | 'ORGANIZER' | 'ATTENDEE'
}


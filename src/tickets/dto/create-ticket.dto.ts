import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'clx123abc' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ example: 'clx456def' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 200.0 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
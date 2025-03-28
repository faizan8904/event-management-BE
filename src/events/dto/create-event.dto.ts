import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Fest 2025' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A tech extravaganza' })
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-04-15T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'College Auditorium' })
  @IsString()
  @IsNotEmpty()
  venue: string;
}
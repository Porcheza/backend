import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  newOrder: number;
}

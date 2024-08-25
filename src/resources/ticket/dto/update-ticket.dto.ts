import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsNotEmpty()
  @IsNumber()
  newOrder: number;
}

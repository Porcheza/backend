import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FindOptionsWhere, In } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { QueryFindAllTicketDto } from './dto/query-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll(@Query() params: QueryFindAllTicketDto) {
    const where: FindOptionsWhere<Ticket> = {};
    let order: any = {};
    if (params.status) {
      where.status = In(params.status);
    }
    if (params.sortBy) {
      order = { ...params.sortBy };
    }

    return this.ticketService.findAll(where, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketService.remove(+id);
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Equal, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const lastestOrder = await this.ticketRepository.findOne({
      where: { status: createTicketDto.status },
      order: {
        order: 'DESC',
      },
    });

    if (lastestOrder) {
      createTicketDto.order = lastestOrder.order + 1;
    } else {
      createTicketDto.order = 1;
    }

    return this.ticketRepository.save(createTicketDto);
  }

  findAll() {
    return this.ticketRepository.find({ order: { order: 'ASC' } });
  }

  findOne(id: number) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const oldTicket = await this.ticketRepository.findOne({ where: { id } });

    if (!oldTicket) {
      throw new Error('Ticket not found');
    }

    const sameStatus = oldTicket.status === updateTicketDto.status;
    const reOrderOldStatus = await this.ticketRepository.find({
      where: {
        id: Not(Equal(id)),
        status: oldTicket.status,
        order: sameStatus
          ? MoreThanOrEqual(updateTicketDto.newOrder)
          : MoreThan(oldTicket.order),
      },
      order: { order: 'ASC' },
    });

    for (const [index, ticket] of reOrderOldStatus.entries()) {
      ticket.order = sameStatus
        ? updateTicketDto.newOrder + index + 1
        : ticket.order - 1;

      await this.ticketRepository.save(ticket);
    }

    updateTicketDto.order = updateTicketDto.newOrder;

    if (!sameStatus) {
      const reOrderNewStatus = await this.ticketRepository.find({
        where: {
          status: updateTicketDto.status,
          order: MoreThanOrEqual(updateTicketDto.newOrder),
        },
        order: { order: 'ASC' },
      });

      if (reOrderNewStatus.length > 0) {
        for (const [index, ticket] of reOrderNewStatus.entries()) {
          ticket.order = updateTicketDto.newOrder + index + 1;
          await this.ticketRepository.save(ticket);
        }
        updateTicketDto.order = updateTicketDto.newOrder;
      } else {
        const lastestOrder = await this.ticketRepository.findOne({
          where: { status: updateTicketDto.status },
          order: { order: 'DESC' },
        });

        if (lastestOrder) {
          updateTicketDto.order = lastestOrder.order + 1;
        } else {
          updateTicketDto.order = 1;
        }
      }
    }

    return this.ticketRepository.update(id, omit(updateTicketDto, 'newOrder'));
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}

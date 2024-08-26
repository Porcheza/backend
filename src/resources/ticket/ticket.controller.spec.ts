import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Status } from '../../common/enum/status';
import { UpdateResult } from 'typeorm';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  const mockTicketService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tickets', async () => {
    const result = [{ id: 1, title: 'Test Ticket' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as Ticket[]);

    expect(await controller.findAll({})).toBe(result);
  });

  it('should return a single ticket', async () => {
    const result = { id: 1, title: 'Test Ticket' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as Ticket);

    expect(await controller.findOne('1')).toBe(result);
  });

  it('should create a ticket', async () => {
    const createTicketDto = {
      title: 'Test Ticket',
      description: 'Test Description',
      contactInfo: 'Test Contact',
      status: Status.PENDING,
    } as CreateTicketDto;
    const result = { id: 1, ...createTicketDto };
    jest.spyOn(service, 'create').mockResolvedValue(result as Ticket);

    expect(await controller.create(createTicketDto)).toBe(result);
  });

  it('should update a ticket', async () => {
    const updateTicketDto = { title: 'Updated Ticket' } as UpdateTicketDto;
    jest.spyOn(service, 'update').mockResolvedValue({} as UpdateResult);

    expect(await controller.update('1', updateTicketDto)).toEqual({});
  });
});

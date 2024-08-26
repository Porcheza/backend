import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../database/config/database.config';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Repository } from 'typeorm';
import { Status } from '../../common/enum/status';

describe('TicketService', () => {
  let module: TestingModule;
  let service: TicketService;
  let repository: Repository<Ticket>;
  let mockTicket;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [TicketService],
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            ...configService.get('database'),
            autoLoadEntities: true,
          }),
        }),
        TypeOrmModule.forFeature([Ticket]),
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    repository = module.get(getRepositoryToken(Ticket));
  });

  afterAll(async () => {
    await repository.clear();
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a ticket', async () => {
    const createTicketDto = {
      title: 'ticket-test',
      description: 'description',
      contactInfo: 'contactInfo',
      status: Status.PENDING,
    } as CreateTicketDto;

    mockTicket = await service.create(createTicketDto);
    expect(mockTicket).toBeDefined();
    expect(mockTicket).toHaveProperty('id');
    expect(mockTicket.title).toBe(createTicketDto.title);
    expect(mockTicket.description).toBe(createTicketDto.description);
    expect(mockTicket.contactInfo).toBe(createTicketDto.contactInfo);
    expect(mockTicket.status).toBe(createTicketDto.status);
  });

  it('should find all tickets', async () => {
    const foundTickets = await service.findAll();
    expect(foundTickets).toBeDefined();
    expect(foundTickets).toBeInstanceOf(Array);
    expect(foundTickets).toHaveLength(1);
    expect(foundTickets[0]).toHaveProperty('id');
    expect(foundTickets[0]).toHaveProperty('title');
    expect(foundTickets[0].title).toBe('ticket-test');
  });

  it('should find a ticket by ID', async () => {
    const ticketId = mockTicket.id;

    const foundTicket = await service.findOne(ticketId);
    expect(foundTicket).toBeDefined();
    expect(foundTicket).toHaveProperty('id');
    expect(foundTicket.id).toBe(ticketId);
  });

  it('should update a ticket from one status to another status', async () => {
    const createTicketDto = {
      title: 'ticket-test-2',
      description: 'description',
      contactInfo: 'contactInfo',
      status: Status.PENDING,
    } as CreateTicketDto;
    const mockTicket2 = await service.create(createTicketDto);
    expect(mockTicket2.order).toBe(2);

    const ticketId = mockTicket.id;
    const updateTicketDto = {
      title: 'ticket-test-updated',
      description: 'description',
      contactInfo: 'contactInfo',
      status: Status.ACCEPTED,
      newOrder: 1,
    } as UpdateTicketDto;

    await service.update(ticketId, updateTicketDto);

    const foundTicket1 = await service.findOne(ticketId);
    expect(foundTicket1).toBeDefined();
    expect(foundTicket1).toHaveProperty('id');
    expect(foundTicket1.id).toBe(ticketId);
    expect(foundTicket1).toHaveProperty('title');
    expect(foundTicket1.title).toBe(updateTicketDto.title);
    expect(foundTicket1).toHaveProperty('status');
    expect(foundTicket1.status).toBe(Status.ACCEPTED);
    expect(foundTicket1.order).toBe(1);

    const foundTicket2 = await service.findOne(mockTicket2.id);
    expect(foundTicket2.order).toBe(1);
    expect(foundTicket2.status).toBe(Status.PENDING);
  });

  it('should update a ticket same status but changed order', async () => {
    const createTicketDto = {
      title: 'ticket-test-3',
      description: 'description',
      contactInfo: 'contactInfo',
      status: Status.ACCEPTED,
    } as CreateTicketDto;
    const mockTicket3 = await service.create(createTicketDto);
    expect(mockTicket3.order).toBe(2);

    const ticketId = mockTicket.id;
    const updateTicketDto = {
      title: 'ticket-test-updated',
      description: 'description',
      contactInfo: 'contactInfo',
      status: Status.ACCEPTED,
      newOrder: 2,
    } as UpdateTicketDto;

    await service.update(ticketId, updateTicketDto);

    const foundTicket1 = await service.findOne(ticketId);
    expect(foundTicket1).toBeDefined();
    expect(foundTicket1).toHaveProperty('id');
    expect(foundTicket1.id).toBe(ticketId);
    expect(foundTicket1).toHaveProperty('title');
    expect(foundTicket1.title).toBe(updateTicketDto.title);
    expect(foundTicket1).toHaveProperty('status');
    expect(foundTicket1.status).toBe(Status.ACCEPTED);
    expect(foundTicket1.order).toBe(2);

    const foundTicket2 = await service.findOne(mockTicket3.id);
    expect(foundTicket2.order).toBe(1);
    expect(foundTicket2.status).toBe(Status.ACCEPTED);
  });
});

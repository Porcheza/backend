import { IsOptional } from 'class-validator';
import { Status } from 'src/common/enum/status';

export class QueryFindAllTicketDto {
  @IsOptional()
  status?: Status[];

  @IsOptional()
  sortBy?: object;
}

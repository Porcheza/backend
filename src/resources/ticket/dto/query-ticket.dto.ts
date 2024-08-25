import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Status } from 'src/common/enum/status';

export class QueryFindAllTicketDto {
  @ApiProperty()
  @IsOptional()
  status?: Status[];

  @ApiProperty()
  @IsOptional()
  sortBy?: object;
}

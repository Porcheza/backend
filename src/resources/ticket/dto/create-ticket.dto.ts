import { Status } from '../../../common/enum/status';
import { IsOptional, IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contactInfo: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: Status;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  order: number;
}

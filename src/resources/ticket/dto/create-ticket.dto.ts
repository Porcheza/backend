import { Status } from 'src/common/enum/status';
import { IsOptional, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  contactInfo: string | null;

  @IsNotEmpty()
  @IsString()
  status: Status;

  @IsOptional()
  @IsNumber()
  order: number;
}

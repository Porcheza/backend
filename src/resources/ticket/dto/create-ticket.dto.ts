import { Status } from 'src/common/enum/status';

export class CreateTicketDto {
  title: string;
  description: string;
  contactInfo: string | null;
  status: Status;
}

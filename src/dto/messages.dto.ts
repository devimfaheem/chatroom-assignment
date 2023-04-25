import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  sender_id: string;

  @ApiProperty()
  content: string;
}

export class ResponseMessageDto {
  chatroom_id: string;
  sender_id: string;
  content: string;
  created_at: Date;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateChatroomDto {
  @ApiProperty()
  participants: string[];
}

export class UpdateChatroomDto {
  @ApiProperty()
  participants: string[];
}

export class ResponseChatroomDto {
  chatroom_id: string;
  participants: string[];
}

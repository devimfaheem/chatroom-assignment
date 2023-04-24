import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './message.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateMessageDto, ResponseMessageDto } from 'src/dto/messages.dto';

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post(':chatroom_id')
  @ApiBody({ description: 'Add a message to chatroom', type: CreateMessageDto })
  @ApiResponse({
    status: 200,
  })
  async createMessage(
    @Param('chatroom_id') chatroom_id: string,
    @Body('sender_id') sender_id: string,
    @Body('content') content: string,
  ): Promise<ResponseMessageDto> {
    return this.messagesService.createMessage(chatroom_id, sender_id, content);
  }

  @Get(':chatroom_id')
  @ApiBody({
    description: 'Get chatroom messages sorted latest',
  })
  @ApiResponse({
    status: 200,
  })
  async getConversation(
    @Param('chatroom_id') chatroom_id: string,
  ): Promise<ResponseMessageDto[]> {
    return this.messagesService.getMessages(chatroom_id);
  }
}

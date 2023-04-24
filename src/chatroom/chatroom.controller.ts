import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  CreateChatroomDto,
  ResponseChatroomDto,
  UpdateChatroomDto,
} from 'src/dto/chatrooms.dto';

@Controller('chatrooms')
@ApiTags('chatrooms')
export class ChatroomController {
  constructor(private chatroomService: ChatroomService) {}

  @Post()
  @ApiBody({ description: 'Create a new chatroom', type: CreateChatroomDto })
  @ApiResponse({
    status: 201,
    description: 'The new chatroom has been successfully created.',
  })
  async createConversation(
    @Body('participants') participants: string[],
  ): Promise<ResponseChatroomDto> {
    return this.chatroomService.createChatroom(participants);
  }

  @Get()
  async getChatrooms(): Promise<ResponseChatroomDto[]> {
    return this.chatroomService.getChatrooms();
  }

  @Put(':chatroomId')
  @ApiBody({
    description: 'update chatroom participants',
    type: UpdateChatroomDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Chatroom has been successfully updated.',
  })
  async updateChatroom(
    @Param('chatroomId') chatroomId: string,
    @Body('participants') participants: string[],
  ): Promise<ResponseChatroomDto> {
    return this.chatroomService.update(chatroomId, participants);
  }

  @Get(':chatroomId')
  @ApiBody({
    description: 'Get one chatroom by id',
  })
  @ApiResponse({
    status: 200,
  })
  async getConversationById(
    @Param('chatroomId') chatroomId: string,
  ): Promise<ResponseChatroomDto> {
    return this.chatroomService.getChatroomById(chatroomId);
  }
}

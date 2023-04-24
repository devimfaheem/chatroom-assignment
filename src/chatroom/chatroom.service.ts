import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chatroom } from '../entities/chatrooms.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResponseChatroomDto } from 'src/dto/chatrooms.dto';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectRepository(Chatroom)
    private chatroomRepository: Repository<Chatroom>,
  ) {}

  async createChatroom(participants: string[]): Promise<ResponseChatroomDto> {
    const newChatroom = await this.chatroomRepository.create({
      participants,
    });
    newChatroom.chatroom_id = uuidv4();
    newChatroom.created_at = new Date();
    const room = await this.chatroomRepository.save(newChatroom);
    return this.mapper(room);
  }

  async update(
    chatroomId: string,
    participants: string[],
  ): Promise<ResponseChatroomDto> {
    const conversationToUpdate = await this.getChatroomById(chatroomId);
    conversationToUpdate.participants = participants;
    const room = await this.chatroomRepository.save(conversationToUpdate);
    return this.mapper(room);
  }

  async getChatrooms(): Promise<ResponseChatroomDto[]> {
    const rooms = await this.chatroomRepository.find();
    return rooms.map((room) => this.mapper(room));
  }

  async getChatroomById(chatroomId: string): Promise<ResponseChatroomDto> {
    const room = await this.chatroomRepository.findOne({
      where: { chatroom_id: chatroomId },
    });
    return this.mapper(room);
  }

  mapper(chatroom: Chatroom) {
    return {
      chatroom_id: chatroom.chatroom_id,
      participants: chatroom.participants,
      created_at: chatroom.created_at,
    };
  }
}

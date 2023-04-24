import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from 'src/dto/messages.dto';
import { Repository } from 'typeorm';
import { Message } from '../entities/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(
    chatroom_id: string,
    sender_id: string,
    content: string,
  ): Promise<ResponseMessageDto> {
    const newMessage = await this.messageRepository.create({
      chatroom_id,
      sender_id,
      content,
      created_at: new Date(),
    });
    const message = await this.messageRepository.save(newMessage);
    return this.mapper(message);
  }

  async getMessages(chatroom_id: string): Promise<ResponseMessageDto[]> {
    const messages = await this.messageRepository.find({
      where: { chatroom_id },
      order: { created_at: 'DESC' },
    });
    return messages.map((message) => this.mapper(message));
  }

  mapper(message) {
    return {
      chatroom_id: message.chatroom_id,
      sender_id: message.sender_id,
      content: message.content,
      created_at: message.created_at,
    };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesService } from './message.service';
import { Message } from '../entities/messages.entity';
import { ResponseMessageDto } from '../dto/messages.dto';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let messageRepository: Repository<Message>;

  const mockMessage = {
    id: '1',
    chatroom_id: 'chatroom_id',
    sender_id: 'sender_id',
    content: 'Hello, world!',
    created_at: new Date(),
  };

  const mockMessageRepository = {
    create: jest.fn().mockResolvedValue(mockMessage),
    save: jest.fn().mockReturnValue(mockMessage),
    find: jest.fn().mockResolvedValue([mockMessage]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    messageRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message),
    );
  });

  describe('createMessage', () => {
    it('should create and return a new message', async () => {
      const chatroom_id = 'chatroom_id';
      const sender_id = 'sender_id';
      const content = 'Hello, world!';
      const result: ResponseMessageDto = await messagesService.createMessage(
        chatroom_id,
        sender_id,
        content,
      );
      expect(mockMessageRepository.create).toHaveBeenCalledWith({
        chatroom_id,
        sender_id,
        content,
        created_at: expect.any(Date),
      });
      expect(mockMessageRepository.save).toHaveBeenCalledWith(mockMessage);
      expect(result).toEqual({
        chatroom_id: mockMessage.chatroom_id,
        sender_id: mockMessage.sender_id,
        content: mockMessage.content,
        created_at: mockMessage.created_at,
      });
    });
  });

  describe('getMessages', () => {
    it('should return an array of messages for a given chatroom_id', async () => {
      const chatroom_id = 'chatroom_id';
      const result: ResponseMessageDto[] = await messagesService.getMessages(
        chatroom_id,
      );
      expect(mockMessageRepository.find).toHaveBeenCalledWith({
        where: { chatroom_id },
        order: { created_at: 'DESC' },
      });
      expect(result).toEqual([
        {
          chatroom_id: mockMessage.chatroom_id,
          sender_id: mockMessage.sender_id,
          content: mockMessage.content,
          created_at: mockMessage.created_at,
        },
      ]);
    });
  });

  describe('mapper', () => {
    it('should return a ResponseMessageDto object from a Message entity', () => {
      const result: ResponseMessageDto = messagesService.mapper(mockMessage);
      expect(result).toEqual({
        chatroom_id: mockMessage.chatroom_id,
        sender_id: mockMessage.sender_id,
        content: mockMessage.content,
        created_at: mockMessage.created_at,
      });
    });
  });
});

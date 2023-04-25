import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';
import { CreateMessageDto, ResponseMessageDto } from '../dto/messages.dto';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            createMessage: jest.fn(),
            getMessages: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  describe('createMessage', () => {
    it('should return a message object when passed valid parameters', async () => {
      const message: ResponseMessageDto = {
        chatroom_id: 'chatroom_123',
        sender_id: 'user_123',
        content: 'hello',
        created_at: new Date(),
      };

      (service.createMessage as jest.Mock).mockResolvedValue(message);

      const createMessageDto: CreateMessageDto = {
        sender_id: 'user_123',
        content: 'hello',
      };

      const result = await controller.createMessage(
        'chatroom_123',
        createMessageDto.sender_id,
        createMessageDto.content,
      );

      expect(result).toEqual(message);
      expect(service.createMessage).toHaveBeenCalledWith(
        'chatroom_123',
        createMessageDto.sender_id,
        createMessageDto.content,
      );
    });

    it('should throw an error when passed invalid parameters', async () => {
      (service.createMessage as jest.Mock).mockRejectedValue(
        new Error('Invalid parameters'),
      );

      const createMessageDto: CreateMessageDto = {
        sender_id: '',
        content: '',
      };

      await expect(
        controller.createMessage(
          'chatroom_123',
          createMessageDto.sender_id,
          createMessageDto.content,
        ),
      ).rejects.toThrow();
      expect(service.createMessage).toHaveBeenCalledWith(
        'chatroom_123',
        createMessageDto.sender_id,
        createMessageDto.content,
      );
    });
  });

  describe('getConversation', () => {
    it('should return an array of messages when passed a valid chatroom_id', async () => {
      const messages: ResponseMessageDto[] = [
        {
          chatroom_id: 'chatroom_123',
          sender_id: 'user_123',
          content: 'hello',
          created_at: new Date(),
        },
        {
          chatroom_id: 'chatroom_123',
          sender_id: 'user_456',
          content: 'world',
          created_at: new Date(),
        },
      ];

      (service.getMessages as jest.Mock).mockResolvedValue(messages);

      const result = await controller.getConversation('chatroom_123');

      expect(result).toEqual(messages);
      expect(service.getMessages).toHaveBeenCalledWith('chatroom_123');
    });

    it('should throw an error when passed an invalid chatroom_id', async () => {
      (service.getMessages as jest.Mock).mockRejectedValue(
        new Error('Invalid chatroom_id'),
      );

      await expect(controller.getConversation('')).rejects.toThrow();
      expect(service.getMessages).toHaveBeenCalledWith('');
    });
  });
});

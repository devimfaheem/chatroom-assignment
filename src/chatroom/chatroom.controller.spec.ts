import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { ResponseChatroomDto } from '../dto/chatrooms.dto';

describe('ChatroomController', () => {
  let chatroomController: ChatroomController;
  let chatroomServiceMock: any;

  beforeEach(async () => {
    chatroomServiceMock = {
      createChatroom: jest.fn(),
      getChatrooms: jest.fn(),
      update: jest.fn(),
      getChatroomById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomController],
      providers: [
        {
          provide: ChatroomService,
          useValue: chatroomServiceMock,
        },
      ],
    }).compile();

    chatroomController = module.get<ChatroomController>(ChatroomController);
  });

  describe('createConversation', () => {
    it('should create a new chatroom', async () => {
      const participants = ['user1', 'user2'];
      const chatroom = { chatroom_id: '1', participants };

      chatroomServiceMock.createChatroom.mockResolvedValue(chatroom);

      const result = await chatroomController.createConversation(participants);

      expect(chatroomServiceMock.createChatroom).toHaveBeenCalledWith(
        participants,
      );
      expect(result).toEqual(chatroom);
    });
  });

  describe('getChatrooms', () => {
    it('should return all chatrooms', async () => {
      const chatrooms: ResponseChatroomDto[] = [
        { chatroom_id: '1', participants: ['user1', 'user2'] },
        { chatroom_id: '2', participants: ['user2', 'user3'] },
      ];

      chatroomServiceMock.getChatrooms.mockResolvedValue(chatrooms);

      const result = await chatroomController.getChatrooms();

      expect(chatroomServiceMock.getChatrooms).toHaveBeenCalled();
      expect(result).toEqual(chatrooms);
    });
  });

  describe('updateChatroom', () => {
    it('should update a chatroom', async () => {
      const chatroomId = '1';
      const participants = ['user1', 'user2'];
      const chatroom = { chatroom_id: chatroomId, participants };

      chatroomServiceMock.update.mockResolvedValue(chatroom);

      const result = await chatroomController.updateChatroom(
        chatroomId,
        participants,
      );

      expect(chatroomServiceMock.update).toHaveBeenCalledWith(
        chatroomId,
        participants,
      );
      expect(result).toEqual(chatroom);
    });
  });

  describe('getConversationById', () => {
    it('should return a chatroom by id', async () => {
      const chatroomId = '1';
      const chatroom = {
        chatroom_id: chatroomId,
        participants: ['user1', 'user2'],
      };

      chatroomServiceMock.getChatroomById.mockResolvedValue(chatroom);

      const result = await chatroomController.getConversationById(chatroomId);

      expect(chatroomServiceMock.getChatroomById).toHaveBeenCalledWith(
        chatroomId,
      );
      expect(result).toEqual(chatroom);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomService } from './chatroom.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chatroom } from '../entities/chatrooms.entity';

describe('ChatroomService', () => {
  let chatroomService: ChatroomService;
  let chatroomRepository: Repository<Chatroom>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatroomService,
        {
          provide: getRepositoryToken(Chatroom),
          useClass: jest.fn(() => ({
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          })),
        },
      ],
    }).compile();

    chatroomService = module.get<ChatroomService>(ChatroomService);
    chatroomRepository = module.get<Repository<Chatroom>>(
      getRepositoryToken(Chatroom),
    );
  });

  describe('createChatroom', () => {
    it('should create a new chatroom', async () => {
      const participants = ['user1', 'user2'];
      const chatroom = new Chatroom();
      chatroom.participants = participants;
      jest.spyOn(chatroomRepository, 'create').mockReturnValue(chatroom);
      jest.spyOn(chatroomRepository, 'save').mockResolvedValue(chatroom);
      const result = await chatroomService.createChatroom(participants);
      expect(chatroomRepository.create).toHaveBeenCalledWith({ participants });
      expect(chatroomRepository.save).toHaveBeenCalledWith(chatroom);
      expect(result).toEqual({
        chatroom_id: expect.any(String),
        participants,
        created_at: expect.any(Date),
      });
    });
  });

  describe('update', () => {
    it('should update an existing chatroom', async () => {
      const chatroomId = 'chatroom_id';
      const participants = ['user3', 'user4'];
      const chatroom = new Chatroom();
      chatroom.participants = participants;
      chatroom.chatroom_id = chatroomId;
      chatroom.created_at = new Date();
      jest.spyOn(chatroomRepository, 'findOne').mockResolvedValue(chatroom);
      jest.spyOn(chatroomRepository, 'save').mockResolvedValue(chatroom);
      const result = await chatroomService.update(chatroomId, participants);
      expect(chatroomRepository.findOne).toHaveBeenCalledWith({
        where: { chatroom_id: chatroomId },
      });
      expect(chatroomRepository.save).toHaveBeenCalledWith(chatroom);
      expect(result).toEqual({
        chatroom_id: chatroomId,
        participants,
        created_at: chatroom.created_at,
      });
    });
  });

  describe('getChatrooms', () => {
    it('should return an array of chatrooms', async () => {
      const chatrooms = [
        {
          _id: '1',
          chatroom_id: '1',
          participants: ['Alice', 'Bob'],
          created_at: new Date(),
        },
        {
          _id: '2',
          chatroom_id: '2',
          participants: ['Charlie', 'David'],
          created_at: new Date(),
        },
      ];
      jest.spyOn(chatroomRepository, 'find').mockResolvedValue(chatrooms);

      const result = await chatroomService.getChatrooms();

      expect(result).toEqual(chatrooms.map((c) => chatroomService.mapper(c)));
    });
  });
});

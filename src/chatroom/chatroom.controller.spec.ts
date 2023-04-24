import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';

describe('UserController', () => {
  let controller: ChatroomController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomController],
      providers: [ChatroomService],
    }).compile();

    controller = app.get<ChatroomController>(ChatroomController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(controller.getHello()).toBe('Hello World!');
    });
  });
});

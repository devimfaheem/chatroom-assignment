import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';

describe('UserController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    }).compile();

    controller = app.get<MessagesController>(MessagesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(controller.getHello()).toBe('Hello World!');
    });
  });
});

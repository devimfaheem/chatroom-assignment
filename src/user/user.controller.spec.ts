import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entities/users.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [new User(), new User()];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      expect(await controller.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new User();
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      expect(await controller.findOne('id')).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = new User();
      jest.spyOn(userService, 'create').mockResolvedValue(user);

      expect(await controller.create(user)).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = new User();
      jest.spyOn(userService, 'update').mockResolvedValue(user);

      expect(await controller.update('id', user)).toEqual(user);
    });
  });
});

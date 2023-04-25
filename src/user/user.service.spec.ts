import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/users.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [new User(), new User()];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users.map((user) => userService.mapper(user)));
    });
  });

  describe('findOne', () => {
    it('should return a user with the specified ID', async () => {
      const id = '12345';
      const user = new User();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.findOne(id);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { userId: id },
      });
      expect(result).toEqual(userService.mapper(user));
    });
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(uuidv4, 'call').mockReturnValue('abcde');

      const result = await userService.create(user);

      expect(userRepository.create).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update an existing user and return it', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await userService.update(user);

      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('mapper', () => {
    it('should map a User object to a ResponseUserDto object', () => {
      const user = new User();
      user.userId = '12345';
      user.userName = 'johndoe';
      user.email = 'johndoe@example.com';

      const result = userService.mapper(user);

      expect(result).toEqual({
        userId: '12345',
        userName: 'johndoe',
        email: 'johndoe@example.com',
      });
    });
  });
});

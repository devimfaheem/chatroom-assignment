import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResponseUserDto } from '../dto/users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.mapper(user));
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    return this.mapper(user);
  }

  async create(user: User): Promise<User> {
    const newUser = await this.userRepository.create(user);
    newUser.userId = uuidv4();
    return this.userRepository.save(newUser);
  }

  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  mapper(user: User): ResponseUserDto {
    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
    };
  }
}

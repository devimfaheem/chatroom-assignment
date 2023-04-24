import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/users.entity';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, ResponseUserDto } from 'src/dto/users.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBody({ description: 'Get all user' })
  @ApiResponse({
    status: 200,
  })
  async findAll(): Promise<ResponseUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiBody({ description: 'Get a user' })
  @ApiResponse({
    status: 200,
  })
  async findOne(@Param('userId') userId: string): Promise<ResponseUserDto> {
    return this.userService.findOne(userId);
  }

  @Post()
  @ApiBody({ description: 'Create a new user', type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The new user has been successfully created.',
  })
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':userId')
  @ApiBody({ description: 'Update a user', type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  async update(
    @Param('userId') userId: string,
    @Body() user: User,
  ): Promise<User> {
    user.userId = userId;
    return this.userService.update(user);
  }
}

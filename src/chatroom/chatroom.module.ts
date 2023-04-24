import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from '../entities/chatrooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom])],
  controllers: [ChatroomController],
  providers: [ChatroomService],
})
export class ChatroomModule {}

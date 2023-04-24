import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../typeorm.config';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessagesModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ChatroomModule,
    MessagesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

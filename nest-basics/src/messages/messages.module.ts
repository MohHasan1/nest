import { Module } from '@nestjs/common';

import { MessagesService } from './messages.service.js';
import { MessagesController } from './messages.controller.js';
import { MessagesRepository } from './messages.repository.js';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}

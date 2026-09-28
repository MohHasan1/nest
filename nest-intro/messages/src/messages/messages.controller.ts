import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto.js';
import { MessagesService } from './messages.service.js';

@Controller('messages')
export class MessagesController {
  constructor(public msgService: MessagesService) {}

  @Get()
  listMessages() {
    return this.msgService.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const res = await this.msgService.findOne(id);
    if (!res) throw new NotFoundException('message not found');

    return res;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.msgService.create(body.content);
  }
}

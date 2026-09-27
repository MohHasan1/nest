import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto.js';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return [{ content: 'old message' }];
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return { id };
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return { body };
  }
}

import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository.js';

@Injectable()
export class MessagesService {
  constructor(public msgRepo: MessagesRepository) {}

  async findOne(id: string) {
    return this.msgRepo.findOne(id);
  }

  async findAll() {
    return this.msgRepo.findAll();
  }

  async create(content: string) {
    return this.msgRepo.create(content);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  find(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    // Option 1: no hook - using plain object
    // return this.userRepo.update(id, attrs);

    // Option 2: To use entity (runs hook)
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found!');

    Object.assign(user, attrs);

    return this.userRepo.save(user);
  }

  async remove(id: number) {
    // Option 1: no hook - using plain object
    // return this.userRepo.delete(id);

    // Option 2: To use entity (runs hook)
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found!');

    return this.userRepo.remove(user);
  }
}

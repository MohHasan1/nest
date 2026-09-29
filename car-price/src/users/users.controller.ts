import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UsersService } from './users.service.js';
import { updateUserDto } from './dtos/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Get()
  async find(@Query('email') email: string) {
    if (!email) return this.userService.findAll();

    const user = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() body: updateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

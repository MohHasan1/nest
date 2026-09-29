import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    console.log('====================================');
    console.log(body);
    console.log('====================================');

    return this.userService.create(body.email, body.password);
  }

  @Get()
  getUser() {}
}

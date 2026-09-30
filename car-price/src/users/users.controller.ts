import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UsersService } from './users.service.js';
import { updateUserDto } from './dtos/update-user.dto.js';
import { Serialize } from '../interceptors/serialize.interceptors.js';
import { UserDto } from './dtos/user.dto.js';
import { AuthService } from './auth.service.js';

@Controller('users')
@Serialize(UserDto) // opt 2.1 custom serializer decor
// @UseInterceptors(ClassSerializerInterceptor) // opt 1 serializer
// @UseInterceptors(new SerializeInterceptor(UserDto)) // opt 2.0 custom serializer
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/sign-in')
  signinUser(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
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

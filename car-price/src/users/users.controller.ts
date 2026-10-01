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
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UsersService } from './users.service.js';
import { updateUserDto } from './dtos/update-user.dto.js';
import { Serialize } from '../interceptors/serialize.interceptors.js';
import { UserDto } from './dtos/user.dto.js';
import { AuthService } from './auth.service.js';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { User } from './user.entity.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('users')
// @UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDto) // opt 2.1 custom serializer decor
// @UseInterceptors(ClassSerializerInterceptor) // opt 1 serializer
// @UseInterceptors(new SerializeInterceptor(UserDto)) // opt 2.0 custom serializer
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // Test cookies
  @Get('/set-cookie/:value')
  setCookieValue(@Param('value') value: string, @Session() session: any) {
    console.log(value, session);
    session.value = value;
    return 'value set';
  }

  @Get('/get-cookie')
  getCookieValue(@Query('value') value: string, @Session() session: any) {
    if (value) return { value: session[value] };

    return { value: session.value };
  }
  // End Test cookies

  @Post('/sign-up')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);

    session.userId = user.id;
    return user;
  }

  @Post('/sign-in')
  async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);

    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoami(@CurrentUser() user: User) {
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Get('/me')
  async me(@Session() session: any) {
    const user = this.userService.findOne(session.userId);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Post('sign-out')
  async signoutUser(@Session() session: any) {
    session.userId = null;
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

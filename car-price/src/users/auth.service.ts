import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signin(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const [storedHash, salt] = user.password.split('.');

    const hash = (await scryptAsync(password, salt, 32)) as Buffer;
    const hashedPassword = hash.toString('hex');

    if (storedHash !== hashedPassword)
      throw new BadRequestException('Bad password or email');

    return user;
  }

  async signup(email: string, password: string) {
    // used email?
    const user = await this.userService.find(email);
    if (user) throw new BadRequestException('Email in use.');

    // hash
    const salt = randomBytes(8).toString('hex');
    const hash = (await scryptAsync(password, salt, 32)) as Buffer;
    const hashedPassword = hash.toString('hex') + '.' + salt;

    // create n save
    const newUser = await this.userService.create(email, hashedPassword);

    // return
    return newUser;
  }
}

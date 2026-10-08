import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { UsersService } from './users.service.js';
import { User } from './user.entity.js';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UsersService>;
  const users: User[] = []; // In-memory db

  beforeEach(async () => {
    // Mock User service
    mockUserService = {
      find: (email: string) => {
        const filteredUser = users.find((u) => u.email === email);

        return Promise.resolve(filteredUser ?? null);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 200),
          email,
          password,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };

    // DI
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signup('hasan@gmail.com', '123');

    expect(user.password).not.toEqual('123');

    const [hash, salt] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });

  it('throws an error if signup with a used email', async () => {
    await service.signup('same-email-hasan@gmail.com', '123');

    // method 1
    await expect(
      service.signup('same-email-hasan@gmail.com', '123'),
    ).rejects.toThrow(new BadRequestException('Email in use.'));

    // method 2
    // await expect(service.signup('hasan@gmail.com', '123')).rejects.toThrow(
    //   'Email in use.',
    // );
  });

  it('throws if unused email is used in signin', async () => {
    await expect(service.signin('nope@gmail.com', '123')).rejects.toThrow(
      new NotFoundException('user not found'),
    );
  });

  it('throws if invalid password in signin', async () => {
    await service.signup('wrong-pass-hasan@gmail.com', 'correct-pass');

    await expect(
      service.signin('wrong-pass-hasan@gmail.com', 'wrong-pass'),
    ).rejects.toThrow(BadRequestException);
  });

  it('return a user if correct password in signin', async () => {
    // m1 - generate a user using signin and get the hashed pass and use that
    // m2 - use enc
    // m3 - store user and use it while testing - in memory array db

    await service.signup('correct-pass-hasan@gmail.com', 'correct-pass');
    const user = await service.signin(
      'correct-pass-hasan@gmail.com',
      'correct-pass',
    );

    expect(user).toBeDefined();
  });
});

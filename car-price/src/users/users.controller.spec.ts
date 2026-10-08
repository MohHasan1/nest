import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AuthService } from './auth.service.js';
import { User } from './user.entity.js';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUserService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  let userDb: User[] = [];

  beforeEach(async () => {
    // Mock
    mockAuthService = {
      signin: (email: string, _password: string) => {
        const user = userDb.find((u) => u.email === email);

        return Promise.resolve(user as User);
      },
      signup: (email: string, password: string) => {
        const user = { id: Math.floor(Math.random() * 400), email, password };
        userDb.push(user as User);

        return Promise.resolve(user as User);
      },
    };

    // Mock
    mockUserService = {
      findOne: (id: number) => {
        const user = userDb.find((u) => u.id === id);
        return Promise.resolve(user ?? null);
      },
      find: (email: string) => {
        const user = userDb.find((u) => u.email === email);
        return Promise.resolve(user ?? null);
      },
      findAll: () => {
        return Promise.resolve(userDb);
      },
      remove: (id: number) => {
        const removedUser = userDb.find((u) => u.id !== id);
        userDb = userDb.filter((u) => u.id !== id);

        return Promise.resolve(removedUser!);
      },
      update: (id: number, attrs: Partial<User>) => {
        const user = userDb.find((u) => u.id !== id);
        const updatedUser = { ...user, attrs } as unknown as User;
        userDb.forEach((u) => {
          if (u.id === id) return updatedUser;
        });

        return Promise.resolve(updatedUser!);
      },
    };

    // DI
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get(UsersController);

    // sign up few users for testing
    userDb.length = 0;
    await mockAuthService.signup!('mock@test.com', '123');
    await mockAuthService.signup!('mock2@test.com', '123');
    await mockAuthService.signup!('mock3@test.com', '123');
    await mockAuthService.signup!('mock4@test.com', '123');
    await mockAuthService.signup!('mock5@test.com', '123');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns all user when find is called', async () => {
    const users = (await controller.find()) as unknown as User[];

    expect(users.length).toEqual(5);
    expect(users[0].email).toEqual('mock@test.com');
  });

  it('returns a user given an id', async () => {
    const user = userDb[0];
    const users = await controller.getUser(user.id);

    expect(users).toBeDefined();
    expect(users.email).toEqual('mock@test.com');
  });

  it('throws a user given an incorrect id', async () => {
    await expect(controller.getUser(1919191919)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('updates session object when signed in', async () => {
    const session: any = {};
    const user = await controller.signinUser(
      {
        email: 'mock2@test.com',
        password: '123',
      },
      session,
    );

    expect(user).toBeDefined();
    expect(session.userId).toEqual(user.id);
  });
});

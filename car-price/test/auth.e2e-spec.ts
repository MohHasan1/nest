import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/signup (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users/sign-up')
      .send({
        email: 'test@gmail.com',
        password: '123',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual('test@gmail.com');
      });
  });

  it('signup and then signin', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send({
        email: 'test@gmail.com',
        password: '123',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/users/me')
      .set('Cookie', cookie!)
      .expect(200);

    expect(body.email).toEqual('test@gmail.com');
  });

  afterEach(async () => {
    await app.close();
  });
});

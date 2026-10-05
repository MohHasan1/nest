import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({ keys: ['secure_random_cookie'] })); // decodes the cookie to gives us the session object,
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
 
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

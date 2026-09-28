import { NestFactory } from '@nestjs/core';
import { ComputerModule } from './computer/computer.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ComputerModule);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

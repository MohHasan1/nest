import { Module } from '@nestjs/common';
import { PowerService } from './power.service.js';

@Module({
  providers: [PowerService], // private within module
  exports: [PowerService], // Public for other modules
})
export class PowerModule {}

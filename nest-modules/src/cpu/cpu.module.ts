import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service.js';
import { PowerModule } from '../power/power.module.js';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}

import { Module } from '@nestjs/common';
import { DiskService } from './disk.service.js';
import { PowerModule } from '../power/power.module.js';

@Module({
  imports: [PowerModule],
  providers: [DiskService],
  exports: [DiskService],
})
export class DiskModule {}

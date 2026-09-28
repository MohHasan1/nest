import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller.js';
import { CpuModule } from '../cpu/cpu.module.js';
import { DiskModule } from '../disk/disk.module.js';

@Module({
  imports: [CpuModule, DiskModule],
  controllers: [ComputerController],
})
export class ComputerModule {}

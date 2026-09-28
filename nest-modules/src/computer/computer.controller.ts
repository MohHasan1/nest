import { Controller, Get } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service.js';
import { DiskService } from '../disk/disk.service.js';

@Controller()
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  start() {
    return { name: 'hasan', status: 'System booted', path: '/computer' };
  }

  @Get('computer')
  run() {
    return [this.cpuService.compute(1, 2), this.diskService.getData()];
  }
}

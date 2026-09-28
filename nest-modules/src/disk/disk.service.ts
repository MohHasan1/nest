import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service.js';

@Injectable()
export class DiskService {
  constructor(public powerService: PowerService) {}

  getData() {
    this.powerService.supplyPower(20);

    return 'data';
  }
}

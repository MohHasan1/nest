import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log('====================================');
    console.log('watts: ', watts);
    console.log('====================================');

    return watts;
  }
}

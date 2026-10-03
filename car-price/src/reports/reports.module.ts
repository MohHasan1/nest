import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity.js';
import { ReportsService } from './reports.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], // create the repo
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

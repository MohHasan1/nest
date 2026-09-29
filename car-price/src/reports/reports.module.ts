import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], // create the repo
  controllers: [ReportsController]
})
export class ReportsModule {}

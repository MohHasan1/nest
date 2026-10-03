import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { CurrentUser } from '../users/decorators/current-user.decorator.js';
import { User } from '../users/user.entity.js';
import { Serialize } from '../interceptors/serialize.interceptors.js';
import { ReportDto } from './dtos/ReportDto.js';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReport() {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}

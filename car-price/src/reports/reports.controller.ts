import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { CurrentUser } from '../users/decorators/current-user.decorator.js';
import { User } from '../users/user.entity.js';
import { Serialize } from '../interceptors/serialize.interceptors.js';
import { ReportDto } from './dtos/Report.dto.js';
import { ApproveReportDto } from './dtos/approve-report.dto.js';
import { AdminGuard } from '../guards/admin.guard.js';
import { GetEstimateDto } from './dtos/get-estimate.dto.js';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async getEstimateReport(@Query() query: GetEstimateDto) {
    const estPrice = await this.reportsService.createEstimate(query);
    return {
      ...query,
      price: estPrice.price,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Body() body: ApproveReportDto, @Param('id') id: number) {
    return this.reportsService.changeApproval(id, body.isApproved);
  }

  @Post('/bulk')
  @UseGuards(AdminGuard)
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateReportDto, whitelist: true }))
    body: CreateReportDto[],
    @CurrentUser()
    user: User,
  ) {
    return this.reportsService.createBulk(body, user);
  }
}

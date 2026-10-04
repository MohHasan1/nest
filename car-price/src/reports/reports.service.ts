import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { User } from '../users/user.entity.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(reportDto);
    report.user = user;

    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, isApproved: boolean) {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) throw new NotFoundException('Report not found.');

    report.isApproved = isApproved;

    return this.reportsRepository.save(report);
  }
}

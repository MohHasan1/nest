import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { User } from '../users/user.entity.js';
import { GetEstimateDto } from './dtos/get-estimate.dto.js';

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

  async createBulk(reportDto: CreateReportDto[], user: User) {
    const reports = this.reportsRepository.create(reportDto);
    reports.forEach((r) => (r.user = user));

    return this.reportsRepository.save(reports);
    // return this.reportsRepository.insert(reports);
  }

  async changeApproval(id: number, isApproved: boolean) {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) throw new NotFoundException('Report not found.');

    report.isApproved = isApproved;

    return this.reportsRepository.save(report);
  }

  async createEstimate(
    estimateDto: GetEstimateDto,
  ): Promise<{ price: number }> {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: estimateDto.make })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: estimateDto.mileage })
      .limit(3)
      .getRawOne() as unknown as  Promise<{ price: number }>;
  }
}

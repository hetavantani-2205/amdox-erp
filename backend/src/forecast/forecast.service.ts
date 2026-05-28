import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ForecastService {

  constructor(
    private prisma: PrismaService
  ) {}

  async getForecast() {

    const employees =
      await this.prisma.user.count();

    const payrolls =
      await this.prisma.payroll.findMany();

    const totalSalary =
      payrolls.reduce(
        (sum, p) => sum + p.netSalary,
        0
      );

    const avgSalary =
      payrolls.length > 0
        ? totalSalary / payrolls.length
        : 50000;

    const forecastData = [

      {
        month: 'Jan',
        demand:
          employees * 120 +
          avgSalary * 0.004,
      },

      {
        month: 'Feb',
        demand:
          employees * 140 +
          avgSalary * 0.005,
      },

      {
        month: 'Mar',
        demand:
          employees * 160 +
          avgSalary * 0.006,
      },

      {
        month: 'Apr',
        demand:
          employees * 180 +
          avgSalary * 0.007,
      },

      {
        month: 'May',
        demand:
          employees * 220 +
          avgSalary * 0.008,
      },

      {
        month: 'Jun',
        demand:
          employees * 260 +
          avgSalary * 0.009,
      },

    ];

    return forecastData.map((item) => ({
      ...item,
      demand: Math.floor(item.demand),
    }));
  }
}
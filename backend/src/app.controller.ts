import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('dashboard')
  async getDashboardData() {

    const employees =
      await this.prisma.user.count();

    const projects =
      await this.prisma.project.count();

    const payroll =
      await this.prisma.user.aggregate({
        _sum: {
          salary: true,
        },
      });

    const recentEmployees =
      await this.prisma.user.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      });

    return {
      employees,
      projects,
      payroll: payroll._sum.salary || 0,
      attendance: 92,
      recentEmployees,
    };
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async generatePayroll() {
    const employees = await this.prisma.user.findMany();

    for (const employee of employees) {
      const basicSalary = employee.salary || 0;

      const hra = basicSalary * 0.2;
      const bonus = 5000;
      const deduction = basicSalary * 0.12;

      const netSalary =
        basicSalary + hra + bonus - deduction;

      await this.prisma.payroll.create({
        data: {
          employeeId: employee.id,
          month: 'May 2026',
          basicSalary,
          hra,
          bonus,
          deduction,
          netSalary,
          status: 'Paid',
        },
      });
    }

    return {
      message: 'Payroll generated successfully',
    };
  }

  async getPayrolls() {
    return this.prisma.payroll.findMany({
      include: {
        employee: true,
      },
    });
  }
}
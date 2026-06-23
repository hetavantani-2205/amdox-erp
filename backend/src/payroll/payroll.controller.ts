import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(
    private payrollService: PayrollService,
  ) {}

  @Get('generate')
  generatePayroll() {
    return this.payrollService.generatePayroll();
  }

  @Get()
  getPayrolls() {
    return this.payrollService.getPayrolls();
  }
}
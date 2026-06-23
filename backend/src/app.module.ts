import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

import { MeetingModule }
from './meeting/meeting.module';

import { ForecastModule }
from './forecast/forecast.module';

import { EmployeesModule } from './employees/employees.module';
import { EmployeeModule } from './employee/employee.module';
import { PayrollModule } from './payroll/payroll.module';

import { AuditModule }
from './audit/audit.module';

import { ProjectsModule } from './projects/projects.module';

import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    EmployeesModule,
    EmployeeModule,
    ProjectsModule,
    PayrollModule,
    MeetingModule,
    ForecastModule,
    AuditModule,
  ],

  controllers: [AppController],

  providers: [
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
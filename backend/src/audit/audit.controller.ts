import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('audit')
export class AuditController {

  constructor(
    private prisma: PrismaService,
  ) {}

  @Get()
  async getLogs() {

    return this.prisma.auditLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 500,
    });

  }
}
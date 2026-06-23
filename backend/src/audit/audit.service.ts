import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async log(data: {
    userId?: string;
    userName: string;
    userEmail: string;
    role: string;
    module: string;
    action: string;
    description: string;
    ipAddress?: string;
    userAgent?: string;
  }) {

    return this.prisma.auditLog.create({
      data: {
        userId: data.userId,
        userName: data.userName,
        userEmail: data.userEmail,
        role: data.role,
        module: data.module,
        action: data.action,
        description: data.description,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });

  }
}
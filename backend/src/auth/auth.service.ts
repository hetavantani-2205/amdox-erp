import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  

  async register(dto: RegisterDto) {

    
    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (existingUser) {

      throw new BadRequestException(
        'Email already exists',
      );

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    // CREATE DEFAULT TENANT
    const tenant =
      await this.prisma.tenant.create({
        data: {
          name: `${dto.name} Company`,
        },
      });

  

    
    const user =
      await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          role: dto.role,
          salary: 50000,
          tenantId: tenant.id,
        },
      });

      const basicSalary = user.salary || 0;

  const hra = basicSalary * 0.2;

  const bonus = 5000;

  const deduction = basicSalary * 0.12;

  const netSalary =
    basicSalary + hra + bonus - deduction;

    return {

      message: 'User registered successfully',

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        salary: user.salary,
      },

    };
  }

  // ================= LOGIN =================

  async login(data: LoginDto) {

    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    // CHECK USER
    if (!user) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );

    }

    // CHECK PASSWORD
    const passwordMatch =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!passwordMatch) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );

    }

    // CHECK ROLE
    if (user.role !== data.role) {

      throw new UnauthorizedException(
        'Invalid role selected',
      );

    }

    // GENERATE JWT TOKEN
    const token =
      this.jwtService.sign({

        userId: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,

      });

    return {

      message: 'Login successful',

      access_token: token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        salary: user.salary,
      },

    };
  }
}
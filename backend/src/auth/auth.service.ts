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

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const tenant = await this.prisma.tenant.create({
      data: {
        name: data.tenantName,
      },
    });

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        tenantId: tenant.id,
        role: 'TENANT_ADMIN',
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        createdAt: user.createdAt,
      },
    };
  }

 async login(data: LoginDto) {

  const user = await this.prisma.user.findUnique({
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

  // ROLE CHECK
  if (user.role !== data.role) {

    throw new UnauthorizedException(
      'Invalid role selected',
    );

  }

  // GENERATE JWT TOKEN
  const token = this.jwtService.sign({
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
    },

  };
  }
}
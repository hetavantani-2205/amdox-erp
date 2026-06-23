import {
Injectable,
BadRequestException,
UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuditService } from '../audit/audit.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

constructor(
private prisma: PrismaService,
private jwtService: JwtService,
private auditService: AuditService,
) {}

async register(dto: RegisterDto) {

```
const existingUser =
  await this.prisma.user.findUnique({
    where: {
      email: dto.email,
    },
  });

if (existingUser) {

  throw new BadRequestException(
    'Email already registered',
  );

}

const hashedPassword =
  await bcrypt.hash(dto.password, 10);

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

await this.auditService.log({
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  role: user.role,
  module: 'Authentication',
  action: 'REGISTER',
  description:
    'New user account created',
});

return {

  message:
    'User registered successfully',

  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    salary: user.salary,
  },

};
```

}

async login(data: LoginDto) {

```
const user =
  await this.prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

if (!user) {

  throw new UnauthorizedException(
    'User not found',
  );

}

const passwordMatch =
  await bcrypt.compare(
    data.password,
    user.password,
  );

if (!passwordMatch) {

  await this.auditService.log({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    role: user.role,
    module: 'Authentication',
    action: 'FAILED_LOGIN',
    description:
      'Invalid password entered',
  });

  throw new UnauthorizedException(
    'Invalid password',
  );

}

if (user.role !== data.role) {

  await this.auditService.log({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    role: user.role,
    module: 'Authentication',
    action: 'FAILED_LOGIN',
    description:
      'Incorrect role selected',
  });

  throw new UnauthorizedException(
    'Selected role is incorrect',
  );

}

const token =
  this.jwtService.sign({

    userId: user.id,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,

  });

await this.auditService.log({
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  role: user.role,
  module: 'Authentication',
  action: 'LOGIN',
  description:
    'User logged in successfully',
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
```

}
}

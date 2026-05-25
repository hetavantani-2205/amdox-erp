import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { UserRole } from '@prisma/client';

export class RegisterDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

}
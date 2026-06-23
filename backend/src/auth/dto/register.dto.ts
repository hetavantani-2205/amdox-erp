import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

import { UserRole } from '@prisma/client';

export class RegisterDto {

  @IsString({
    message: 'Name must be text',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MinLength(3, {
    message:
      'Name must be at least 3 characters',
  })
  @MaxLength(50, {
    message:
      'Name cannot exceed 50 characters',
  })
  name: string;

  @IsEmail(
    {},
    {
      message:
        'Please enter a valid email address',
    },
  )
  email: string;

  @IsString({
    message:
      'Password must be text',
  })
  @IsNotEmpty({
    message:
      'Password is required',
  })
  @MinLength(6, {
    message:
      'Password must be at least 6 characters',
  })
  password: string;

  @IsEnum(UserRole, {
    message:
      'Please select a valid role',
  })
  role: UserRole;

}
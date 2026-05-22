import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  // REGISTER
  @Post('register')
  register(@Body() body: RegisterDto) {

    return this.authService.register(body);

  }

  // LOGIN
  @Post('login')
  login(@Body() body: LoginDto) {

    return this.authService.login(body);

  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {

    return {
      message: 'Protected profile route',
      user: req.user,
    };

  }
}
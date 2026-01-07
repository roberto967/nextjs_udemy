import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from './types/login-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Creates a new login session' })
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
    type: LoginResponse,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.doLogin(loginDto);
  }
}

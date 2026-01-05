import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { AuthenticatedRequest } from '@/auth/types/authenticated-request';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async findOne(@Req() req: AuthenticatedRequest): Promise<UserResponseDto> {
    const user = await this.userService.findOneByOrFail({ id: req.user.id });
    return new UserResponseDto(user);
  }

  @Post()
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @Patch('me')
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiOperation({ summary: 'Update current authenticated user' })
  async update(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.update(req.user.id, dto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @Patch('me/password')
  @ApiOperation({ summary: 'Update password for current authenticated user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updatePassword(req.user.id, dto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Delete current authenticated user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Delete('me')
  async remove(@Req() req: AuthenticatedRequest): Promise<UserResponseDto> {
    const user = await this.userService.remove(req.user.id);
    return new UserResponseDto(user);
  }
}

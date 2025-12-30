import { Controller, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  /* @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOne(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findOneByOrFail({ id: req.user.id });
    return new UserResponseDto(user);
  } */

  /* @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return new UserResponseDto(user);
  } */

  /* @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, dto);
    return new UserResponseDto(user);
  } */

  /* @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updatePassword(req.user.id, dto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async remove(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.remove(req.user.id);
    return new UserResponseDto(user);
  } */
}

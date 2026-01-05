import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '@/user/user.service';
import { HashingService } from '@/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { LoginResponse } from './types/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async doLogin(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(loginDto.email);
    const error = new UnauthorizedException('Usuário ou senha inválidos');

    if (!user) {
      throw error;
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw error;
    }

    const JwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken: LoginResponse = {
      accessToken: this.jwtService.sign(JwtPayload),
    };

    user.forceLogout = false;
    await this.userService.save(user);

    return accessToken;
  }
}

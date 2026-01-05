import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@/common/common.module';
import { UserModule } from '@/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    CommonModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expiration = config.get<string>('JWT_EXPIRATION_STRING');

        if (!secret) {
          throw new InternalServerErrorException(
            'JWT_SECRET not found in .env',
          );
        }

        if (!expiration) {
          throw new InternalServerErrorException(
            'JWT_EXPIRATION not found in .env',
          );
        }

        return {
          secret,
          signOptions: {
            expiresIn: expiration as SignOptions['expiresIn'],
          },
        };
      },
    }),
  ],
})
export class AuthModule {}

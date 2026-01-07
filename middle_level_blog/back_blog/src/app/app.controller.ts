import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @ApiOperation({ summary: 'Get application configuration' })
  @ApiResponse({
    status: 200,
    description: 'Application configuration retrieved successfully.',
    schema: {
      example: {
        appName: 'My NestJS App',
        appVersion: '1.0.0',
      },
    },
  })
  getConfig() {
    const appName = process.env['APP_NAME'];
    const appVersion = process.env['APP_VERSION'];

    return {
      appName,
      appVersion,
    };
  }
}

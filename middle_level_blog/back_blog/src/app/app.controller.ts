import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  getConfig() {
    const appName = process.env['APP_NAME'];
    const appVersion = process.env['APP_VERSION'];

    return {
      appName,
      appVersion,
    };
  }
}

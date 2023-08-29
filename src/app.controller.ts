import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): any {
    return {
      author: 'Dan Rojas',
      project_name: 'Plus',
      version: '1.0',
    };
  }
}

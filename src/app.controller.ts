import { Controller, Get, Req } from '@nestjs/common';
import { RouteConfig, RouteConstraints } from '@nestjs/platform-fastify';
import { FastifyRequest } from 'fastify';
import { RouteShorthandOptions } from 'fastify/types/route';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Code in docs is incorrect
  // https://docs.nestjs.com/techniques/performance#route-config
  @RouteConfig({ output: 'hello world' })
  @Get('/route-config')
  index(@Req() req: FastifyRequest) {
    console.log('req.routeOptions.config', req.routeOptions.config); // { output: 'hello world', url: '/route-config', method: 'GET' }
    // But req.routeOptions.config.output is throw error (Property 'output' does not exist on type 'FastifyContextConfig & FastifyRouteConfig'.)
    const config = (req.routeOptions.config as { output?: string }) || {};
    return config.output;
  }

  // TODO Doesn't work
  @RouteConstraints({ version: '>=1.2.0' } as RouteShorthandOptions)
  @Get('/route-constraints')
  newFeature(@Req() req: FastifyRequest): string {
    console.log('req.headers', req.headers);
    return 'This works only for version >= 1.2.x';
  }
}

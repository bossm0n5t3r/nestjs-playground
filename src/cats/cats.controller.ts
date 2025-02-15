import { Controller, Get, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: FastifyRequest): string {
    console.log('request', request);
    return 'This action returns all cats';
  }
}

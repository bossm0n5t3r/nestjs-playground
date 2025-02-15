import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: FastifyRequest): string {
    console.log('request', request);
    return 'This action returns all cats';
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('route-wildcard/*')
  wildcard(): string {
    return 'This route uses a wildcard';
  }

  @Get('custom-status-code')
  @HttpCode(204)
  customStatusCode(): string {
    return 'This action returns a custom status code';
  }

  @Get('custom-header')
  @Header('Cache-Control', 'no-store')
  customHeader(): string {
    return 'This action returns a custom header';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(): void {
    return;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
    return { url: 'https://docs.nestjs.com' };
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Get('async')
  findAllWithAsync(): Observable<any[]> {
    return of([]);
  }

  @Post('async')
  async createWithAsync(@Body() createCatDto: CreateCatDto) {
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Cat created with async', createCatDto);
    return 'This action adds a new cat';
  }

  @Get('query-parameters')
  async findAllWithQueryParameters(
    @Query('age') age: number,
    @Query('breed') breed: string,
  ) {
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }
}

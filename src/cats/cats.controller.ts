import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Observable<Cat[]> {
    return of(this.catsService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Cat> {
    throw new NotFoundException(`Not found: ${id}`, {
      description: 'This is a custom message',
    });
  }
}

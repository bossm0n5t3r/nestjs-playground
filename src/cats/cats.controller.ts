import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ZodValidationPipe } from '../zod.validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Observable<Cat[]> {
    return of(this.catsService.findAll());
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Observable<Cat> {
    try {
      return of(this.catsService.findOne(id));
    } catch (error) {
      throw new NotFoundException(`Not found: ${id}`, {
        description: (error as Error).message || 'This is a custom message',
      });
    }
  }
}

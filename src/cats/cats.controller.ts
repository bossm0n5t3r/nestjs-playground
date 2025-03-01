import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ZodValidationPipe } from '../zod.validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseInterceptors(CacheInterceptor)
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    console.log('cacheManager', cacheManager);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Put(':name')
  update(
    @Param('name')
    name: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Observable<Cat> {
    return this.catsService.update(name, updateCatDto);
  }

  @Get()
  findAll(): Observable<Cat[]> {
    console.log('Fetching cats');
    return this.catsService.findAll();
  }

  @Get(':name')
  findOne(
    @Param('name')
    name: string,
  ): Observable<Cat> {
    try {
      return this.catsService.findOne(name);
    } catch (error) {
      throw new NotFoundException(`Not found: ${name}`, {
        description: (error as Error).message || 'This is a custom message',
      });
    }
  }
}

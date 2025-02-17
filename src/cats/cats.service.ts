import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    const id = this.cats.length + 1;
    this.cats.push({ id, ...cat });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    const cat = this.findOne(id);
    if (!cat) {
      return;
    }
    if (updateCatDto.name) {
      cat.name = updateCatDto.name;
    }
    if (updateCatDto.age) {
      cat.age = updateCatDto.age;
    }
    if (updateCatDto.breed) {
      cat.breed = updateCatDto.breed;
    }
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new Error(`Cat with id ${id} not found`);
    }
    return cat;
  }
}

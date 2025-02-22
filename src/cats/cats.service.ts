import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable, switchMap } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  create(cat: CreateCatDto): Observable<Cat> {
    const createdCat = new this.catModel(cat);
    return from(createdCat.save());
  }

  update(name: string, updateCatDto: UpdateCatDto): Observable<Cat> {
    return from(this.catModel.findOne({ name }).exec()).pipe(
      map((cat) => {
        if (!cat) {
          throw new NotFoundException(`Not found: ${name}`);
        }
        return cat;
      }),
      switchMap((cat) => {
        console.log('cat', cat);
        if (updateCatDto.name !== undefined && updateCatDto.name !== null) {
          cat.name = updateCatDto.name;
        }
        if (updateCatDto.age !== undefined && updateCatDto.age !== null) {
          cat.age = updateCatDto.age;
        }
        if (updateCatDto.breed !== undefined && updateCatDto.breed !== null) {
          cat.breed = updateCatDto.breed;
        }
        return from(cat.save());
      }),
    );
  }

  findAll(): Observable<Cat[]> {
    return from(this.catModel.find().exec());
  }

  findOne(name: string): Observable<Cat> {
    const cat = this.catModel.findOne({ name }).exec() as Promise<Cat>;
    return from(cat);
  }
}

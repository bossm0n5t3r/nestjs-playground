import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';

class MockCatModel {
  static find = jest.fn().mockReturnThis();
  static exec = jest.fn().mockResolvedValue([]);
}

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        { provide: getModelToken(Cat.name), useValue: MockCatModel },
      ],
    }).compile();

    catsService = moduleRef.get(CatsService);
    catsController = moduleRef.get(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const expected = [{ name: 'test', age: 1, breed: 'test breed' }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => of(expected));

      let result: Cat[] = [];
      catsController.findAll().subscribe((data) => {
        result = data;
      });
      expect(result).toBe(expected);
    });
  });
});

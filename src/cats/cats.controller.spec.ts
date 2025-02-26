import { Model } from 'mongoose';
import { of } from 'rxjs';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let catModel: Model<Cat>;

  beforeEach(() => {
    catModel = {} as Model<Cat>;
    catsService = new CatsService(catModel);
    catsController = new CatsController(catsService);
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

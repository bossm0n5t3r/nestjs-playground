import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const expected = [{ id: 1, name: 'test', age: 2, breed: 'test breed' }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => expected);

      let result: Cat[] = [];
      catsController.findAll().subscribe((data) => {
        result = data;
      });
      expect(result).toBe(expected);
    });
  });
});

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const result = [{ id: 1, name: 'test', age: 2, breed: 'test breed' }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(catsController.findAll()).toBe(result);
    });
  });
});

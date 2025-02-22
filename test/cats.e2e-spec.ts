import { getModelToken } from '@nestjs/mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../src/cats/cats.controller';
import { CatsService } from '../src/cats/cats.service';
import { Cat } from '../src/cats/schemas/cat.schema';

class MockCatModel {
  static find = jest.fn().mockReturnThis();
  static exec = jest.fn().mockResolvedValue([]);
}

describe('Cats', () => {
  let app: NestFastifyApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        { provide: getModelToken(Cat.name), useValue: MockCatModel },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET cats`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/cats',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual('[]');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

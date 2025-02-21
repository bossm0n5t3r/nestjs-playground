import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsModule } from '../src/cats/cats.module';

describe('Cats', () => {
  let app: NestFastifyApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
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

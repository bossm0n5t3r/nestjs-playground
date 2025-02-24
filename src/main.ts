import compression from '@fastify/compress';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    {
      logger: new ConsoleLogger({
        colors: true,
        json: true,
      }),
    },
  );
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();

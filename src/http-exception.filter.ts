import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const messages = (
      Array.isArray(exceptionResponse['message'])
        ? exceptionResponse['message']
        : [exceptionResponse['message'] ?? '알 수 없는 오류']
    ) // null 대응
      .filter((msg) => msg); // 빈 문자열 제거

    response.status(status).send({
      success: false, // 필수 추가 필드
      statusCode: status,
      message: messages.length > 0 ? messages : ['서버 오류 발생'], // 빈 배열 방지
      error: exception.name.replace('Exception', ''), // "Http" → 제거
      timestamp: new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul', // 한국 시간 강제 적용
      }),
      path: request.url,
    });
  }
}

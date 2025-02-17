import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    return this.validateRequest(request);
  }

  validateRequest(
    request: FastifyRequest,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Example implementation: Check if the request has a valid authorization header
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return false;
    }

    // Here you would typically validate the token, e.g., using a JWT library
    // For simplicity, let's assume a token is valid if it equals 'valid-token'
    const token = authHeader.split(' ')[1];
    if (token === 'valid-token') {
      return true;
    }

    return false;
  }
}

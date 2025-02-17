import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { RoleEnum } from '../enums/role.enum';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const requiredRoles = roles as RoleEnum[];

    if (!requiredRoles?.length) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = request.user;

    if (!user)
      throw new UnauthorizedException({
        code: 'Unauthorized',
        message: '로그인이 필요합니다',
        timestamp: new Date().toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      });

    return this.matchRoles(requiredRoles, user.roles as RoleEnum[]);
  }

  private matchRoles(required: RoleEnum[], userRoles: RoleEnum[]): boolean {
    // 역할이 없는 사용자 차단
    if (!userRoles?.length) return false;

    // 최소 하나의 역할 일치 확인 [1][9]
    return required.some((role) => userRoles.includes(role));
  }
}

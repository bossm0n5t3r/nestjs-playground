import { RoleEnum } from '../src/roles/role.enum.ts';
import { User } from '../src/users/user.interface.ts';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User & {
      // ✅ 사용자 타입 강화
      roles: RoleEnum[];
      permissions?: string[];
    };
  }
}

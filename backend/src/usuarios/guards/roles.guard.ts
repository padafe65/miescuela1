import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';
import { RolUsuario } from '../entities/rol-usuario.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!requiredRoles) return true;

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('No autorizado');

    const hasRole = requiredRoles.some((role) => user.rol.includes(role));

    if (!hasRole) throw new ForbiddenException('Rol no permitido');

    return true;
  }
}

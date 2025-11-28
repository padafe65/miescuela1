import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const hasRole = roles.some((rol) => user.rol.includes(rol));

    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    return true;
  }
}

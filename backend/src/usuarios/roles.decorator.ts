import { SetMetadata } from '@nestjs/common';
<<<<<<< HEAD
import { RolUsuario } from './entities/rol-usuario.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolUsuario[]) => SetMetadata(ROLES_KEY, roles);
=======

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

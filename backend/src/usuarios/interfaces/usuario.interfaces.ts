import { RolUsuario } from '../entities/rol-usuario.enum';

export interface UsuarioInterface {
  id: number;
  nombre_completo: string;
  correo: string;
  contrasena: string;
  rol: RolUsuario[];
}

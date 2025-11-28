import { UsuarioInterface } from '../../usuarios/interfaces/usuario.interfaces';

export interface ProfesorInterface {
  id: number;
  especialidad: string;
  usuario: UsuarioInterface;
}

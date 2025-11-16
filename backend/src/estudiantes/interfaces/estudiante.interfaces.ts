// estudiantes/interfaces/estudiante.interface.ts

import { UsuarioInterface } from '../../usuarios/interfaces/usuario.interfaces';

export interface EstudianteInterface {
  usuario_id?: number; // PK y FK
  año_ingreso: Date;
  usuario?: UsuarioInterface; // Relación 1:1
}

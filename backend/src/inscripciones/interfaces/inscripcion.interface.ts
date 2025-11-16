import { CursoInterface } from '../../cursos/interfaces/curso.interface';
import { EstudianteInterface } from '../../estudiantes/interfaces/estudiante.interfaces';

export interface InscripcionInterface {
  id: number;
  fecha_inscripcion: Date;
  nota: number;
  curso: CursoInterface;
  estudiante: EstudianteInterface;
}

import { ProfesorInterface } from '../../profesores/interfaces/profesor.interface';

export interface CursoInterface {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
  profesor: ProfesorInterface;
}

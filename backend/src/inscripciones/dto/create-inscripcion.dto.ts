import { IsNumber, IsDateString } from 'class-validator';

export class CreateInscripcionDto {
  @IsDateString()
  fecha_inscripcion: string;

  @IsNumber()
  nota: number;

  @IsNumber()
  estudiante_id: number;

  @IsNumber()
  curso_id: number;
}

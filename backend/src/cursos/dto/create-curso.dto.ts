import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @Min(1)
  creditos: number;

  @IsNumber()
  profesor_id: number;
}

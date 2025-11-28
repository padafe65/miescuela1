import { IsEmail, IsString, MinLength, IsDateString } from 'class-validator';

export class RegisterEstudianteDTO {
  @IsString()
  @MinLength(3)
  nombre_completo: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(4)
  contrasena: string;

  @IsDateString()
  fecha_ingreso: string;
}

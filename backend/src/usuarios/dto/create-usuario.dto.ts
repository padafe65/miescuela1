import {
  IsEmail,
  IsIn,
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { UsuarioInterface } from '../interfaces/usuario.interfaces';

export class CreateUsuarioDTO implements Partial<UsuarioInterface> {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre_completo: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  correo: string;

  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  contrasena: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['profesor', 'estudiante', 'administrador'], { each: true })
  rol: string[];
}

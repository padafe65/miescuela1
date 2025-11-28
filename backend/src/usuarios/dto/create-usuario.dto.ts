import {
  IsEmail,
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UsuarioInterface } from '../interfaces/usuario.interfaces';
import { RolUsuario } from '../entities/rol-usuario.enum';

export class CreateUsuarioDTO implements Partial<UsuarioInterface> {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre_completo: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  correo: string;

  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  contrasena: string;

  @IsBoolean()
  isactive: true;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RolUsuario, { each: true })
  rol: RolUsuario[];
}

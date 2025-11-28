import {
  IsEmail,
<<<<<<< HEAD
=======
  IsIn,
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
<<<<<<< HEAD
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UsuarioInterface } from '../interfaces/usuario.interfaces';
import { RolUsuario } from '../entities/rol-usuario.enum';
=======
} from 'class-validator';
import { UsuarioInterface } from '../interfaces/usuario.interfaces';
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

export class CreateUsuarioDTO implements Partial<UsuarioInterface> {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre_completo: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  correo: string;

  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  contrasena: string;

<<<<<<< HEAD
  @IsBoolean()
  isactive: true;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RolUsuario, { each: true })
  rol: RolUsuario[];
=======
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['profesor', 'estudiante', 'administrador'], { each: true })
  rol: string[];
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
}

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDTO {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(4)
  contrasena: string;
}

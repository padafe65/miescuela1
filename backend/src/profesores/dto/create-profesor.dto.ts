import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUsuarioDTO } from '../../usuarios/dto/create-usuario.dto';

export class CreateProfesorDTO extends CreateUsuarioDTO {
  @IsString()
  @IsNotEmpty()
  especialidad: string;
}

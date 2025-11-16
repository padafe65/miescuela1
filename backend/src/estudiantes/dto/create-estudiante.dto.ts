import { IsDate, IsNotEmpty } from 'class-validator';
import { CreateUsuarioDTO } from '../../usuarios/dto/create-usuario.dto';

export class CreateEstudianteDTO extends CreateUsuarioDTO {
  @IsNotEmpty()
  @IsDate()
  fecha_ingreso: Date;
}

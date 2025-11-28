import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUsuarioDTO } from '../../usuarios/dto/create-usuario.dto';

export class CreateEstudianteDTO extends CreateUsuarioDTO {
  @IsNumber()
  usuarios_id: number;

  @IsNotEmpty()
  @IsDate()
  fecha_ingreso: Date;
}

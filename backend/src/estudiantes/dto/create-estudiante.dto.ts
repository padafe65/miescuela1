<<<<<<< HEAD
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUsuarioDTO } from '../../usuarios/dto/create-usuario.dto';

export class CreateEstudianteDTO extends CreateUsuarioDTO {
  @IsNumber()
  usuarios_id: number;

=======
import { IsDate, IsNotEmpty } from 'class-validator';
import { CreateUsuarioDTO } from '../../usuarios/dto/create-usuario.dto';

export class CreateEstudianteDTO extends CreateUsuarioDTO {
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  @IsNotEmpty()
  @IsDate()
  fecha_ingreso: Date;
}

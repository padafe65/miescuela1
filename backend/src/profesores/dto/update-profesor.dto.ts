import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDTO } from './create-profesor.dto';

export class UpdateProfesorDTO extends PartialType(CreateProfesorDTO) {}

// estudiantes/dto/update-estudiante.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDTO } from './create-estudiante.dto';

export class UpdateEstudianteDTO extends PartialType(CreateEstudianteDTO) {}

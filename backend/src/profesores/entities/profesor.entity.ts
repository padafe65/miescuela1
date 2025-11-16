// profesores/entities/profesor.entity.ts

import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';
import { CursoEntity } from '../../cursos/entities/curso.entity';

@Entity('profesores')
export class ProfesorEntity {
  @PrimaryColumn()
  usuarios_id: number;

  @OneToOne(() => UsuarioEntity, (user) => user.profesor, { eager: true })
  @JoinColumn({ name: 'usuarios_id' })
  usuario: UsuarioEntity;

  @Column()
  especialidad: string;

  @OneToMany(() => CursoEntity, (curso) => curso.profesor)
  cursos?: CursoEntity[];
}

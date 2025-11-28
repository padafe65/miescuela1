import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { EstudianteEntity } from '../../estudiantes/entities/estudiante.entity';
import { ProfesorEntity } from '../../profesores/entities/profesor.entity';
import { RolUsuario } from './rol-usuario.enum'; // ← IMPORTACIÓN AQUÍ

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    nullable: false,
    name: 'nombre_completo',
  })
  nombre_completo: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  correo: string;

  @Column()
  contrasena: string;
  @Column({
    type: 'boolean',
    default: true,
  })
  isactive: boolean;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    array: true,
    default: [RolUsuario.ESTUDIANTE],
  })
  rol: RolUsuario[];

  @OneToOne(() => EstudianteEntity, (est) => est.usuario)
  estudiante?: EstudianteEntity;

  @OneToOne(() => ProfesorEntity, (prof) => prof.usuario)
  profesor?: ProfesorEntity;
}

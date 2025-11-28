import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // ✅ ConfigModule global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Configuración de conexión a Postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Pdve4461',
      database: process.env.DB_NAME || 'miescueladb',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsuariosModule,

    EstudiantesModule,

    ProfesoresModule,

    CursosModule,

    InscripcionesModule,

    CommonModule,
  ],
})
export class AppModule {}

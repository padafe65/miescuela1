import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioEntity } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsuariosService],
  controllers: [UsuariosController],

  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsuarioEntity]),

    //Importar JWTMODULE
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          '🔑 JWT SECRET:',
          configService.get('SECRET_JWT_KEY'),
          'lee.env',
        );

        return {
          secret: configService.get('SECRET_JWT_KEY'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule, UsuariosService],
})
export class UsuariosModule {}

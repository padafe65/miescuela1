import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuariosRepository: Repository<UsuarioEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createUsuario(createUsuarioDto: CreateUsuarioDTO) {
    const { contrasena, ...usuarioData } = createUsuarioDto;
    console.log(createUsuarioDto);
    try {
      const usuario = this.usuariosRepository.create({
        ...usuarioData,
        contrasena: bcrypt.hashSync(
          contrasena,
          Number(this.configService.get('SALT_OR_ROUNDS')),
        ),
        rol: Array.isArray(usuarioData.rol)
          ? usuarioData.rol
          : [usuarioData.rol],
      });

      await this.usuariosRepository.save(usuario);
      return {
        usuario: {
          ...usuarioData,
        },
        Message: 'Usuario created!!',
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async loginUsuario(loginUsuarioDto: LoginUsuarioDTO) {
    const { correo, contrasena } = loginUsuarioDto;

    const usuario = await this.usuariosRepository.findOne({
      select: {
        id: true,
        nombre_completo: true,
        correo: true,
        contrasena: true,
        rol: true,
      },
      where: { correo },
    });

    if (!usuario)
      throw new NotFoundException(`User with email: ${correo} not found`);

    const passOrNotPass = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!passOrNotPass) throw new UnauthorizedException(`Contraseña no válida`);

    return {
      Details: {
        Mesagge: 'Inicio de sesion exitoso!!',
        UserDetails: {
          name: usuario.nombre_completo,
          correo: usuario.correo,
        },
      },
      token: this.jwtService.sign({ rol: usuario.rol }),
    };
  }

  async getAllUsuarios() {
    try {
      const usuarios = await this.usuariosRepository.find({
        select: {
          id: true,
          nombre_completo: true,
          correo: true,
          rol: true,
        },
      });
      return usuarios;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async getUsuarioById(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        select: {
          id: true,
          nombre_completo: true,
          correo: true,
          rol: true,
        },
        where: { id: Number(id) },
      });

      if (!usuario)
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

      return usuario;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async updateUsuario(id: string, updateUsuarioDto: CreateUsuarioDTO) {
    const { contrasena, ...usuarioData } = updateUsuarioDto;

    try {
      // 1. Cargar el usuario actual
      const usuarioExistente = await this.usuariosRepository.findOne({
        where: { id: Number(id) },
      });

      if (!usuarioExistente) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      // 2. Construir objeto actualizado
      const datosActualizados: any = {
        ...usuarioExistente,
        ...usuarioData,
        rol: Array.isArray(usuarioData.rol)
          ? usuarioData.rol
          : [usuarioData.rol],
      };

      // 3. Solo actualizar contraseña si la enviaron
      if (contrasena && contrasena.trim() !== '') {
        datosActualizados.contrasena = bcrypt.hashSync(
          contrasena,
          Number(this.configService.get('SALT_OR_ROUNDS')),
        );
      }

      await this.usuariosRepository.save(datosActualizados);

      return {
        usuario: {
          id,
          ...usuarioData,
        },
        Message: 'Usuario updated!!',
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async deleteUsuario(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { id: Number(id) },
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      await this.usuariosRepository.remove(usuario);

      return {
        message: 'Usuario eliminado correctamente',
        id,
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async resetPassword(correo: string, nueva: string) {
    try {
      if (!nueva || nueva.trim() === '') {
        throw new BadRequestException('La nueva contraseña es obligatoria');
      }

      const usuario = await this.usuariosRepository.findOne({
        where: { correo },
      });

      if (!usuario) {
        throw new NotFoundException('Correo no encontrado');
      }

      usuario.contrasena = bcrypt.hashSync(
        nueva,
        Number(this.configService.get('SALT_OR_ROUNDS')),
      );

      await this.usuariosRepository.save(usuario);

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  private handlerErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new BadRequestException(error.message);
  }
}

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
import { RolUsuario } from './entities/rol-usuario.enum';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuariosRepository: Repository<UsuarioEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // ------------------ CREAR USUARIO ------------------
  async createUsuario(createUsuarioDto: CreateUsuarioDTO) {
    const { contrasena, rol, ...restoData } = createUsuarioDto;

    try {
      const usuario = this.usuariosRepository.create({
        ...restoData,
        contrasena: bcrypt.hashSync(
          contrasena,
          Number(this.configService.get('SALT_OR_ROUNDS')),
        ),
        rol: rol.map((r) => r as RolUsuario),
      });

      await this.usuariosRepository.save(usuario);

      return {
        usuario: restoData,
        Message: 'Usuario creado',
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ------------------ LOGIN ------------------
  async loginUsuario(loginUsuarioDto: LoginUsuarioDTO) {
    const { correo, contrasena } = loginUsuarioDto;

    const usuario = await this.usuariosRepository.findOne({
      select: ['id', 'nombre_completo', 'correo', 'contrasena', 'rol'],
      where: { correo },
    });

    if (!usuario)
      throw new NotFoundException(`Usuario con correo ${correo} no existe`);

    const passValido = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!passValido) throw new UnauthorizedException(`Contraseña incorrecta`);

    return {
      Details: {
        Message: 'Inicio de sesión exitoso',
        UserDetails: {
          name: usuario.nombre_completo,
          correo: usuario.correo,
        },
      },
      token: this.jwtService.sign({ rol: usuario.rol }),
    };
  }

  // ------------------ GET ALL ------------------
  async getAllUsuarios() {
    try {
      return await this.usuariosRepository.find({
        select: ['id', 'nombre_completo', 'correo', 'rol'],
      });
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ------------------ GET BY ID ------------------
  async getUsuarioById(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        select: ['id', 'nombre_completo', 'correo', 'rol'],
        where: { id: Number(id) },
      });

      if (!usuario)
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

      return usuario;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ------------------ UPDATE USUARIO ------------------
  async updateUsuario(id: string, updateUsuarioDto: CreateUsuarioDTO) {
    const { contrasena, rol, ...restoData } = updateUsuarioDto;

    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { id: Number(id) },
      });

      if (!usuario)
        throw new NotFoundException(`Usuario con ID ${id} no existe`);

      usuario.nombre_completo = restoData.nombre_completo;
      usuario.correo = restoData.correo;
      usuario.isactive = updateUsuarioDto.isactive;

      if (rol) usuario.rol = rol.map((r) => r as RolUsuario);

      if (contrasena && contrasena.trim() !== '') {
        usuario.contrasena = bcrypt.hashSync(
          contrasena,
          Number(this.configService.get('SALT_OR_ROUNDS')),
        );
      }

      await this.usuariosRepository.save(usuario);

      return {
        usuario,
        Message: 'Usuario actualizado',
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ------------------ DELETE ------------------
  async deleteUsuario(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { id: Number(id) },
      });

      if (!usuario)
        throw new NotFoundException(`Usuario con ID ${id} no existe`);

      await this.usuariosRepository.remove(usuario);

      return {
        message: 'Usuario eliminado correctamente',
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ------------------ RESET PASSWORD ------------------
  async resetPassword(correo: string, nueva: string) {
    try {
      if (!nueva) throw new BadRequestException('Debe enviar la nueva clave');

      const usuario = await this.usuariosRepository.findOne({
        where: { correo },
      });

      if (!usuario) throw new NotFoundException('Correo no existe');

      usuario.contrasena = bcrypt.hashSync(
        nueva,
        Number(this.configService.get('SALT_OR_ROUNDS')),
      );

      await this.usuariosRepository.save(usuario);

      return { message: 'Contraseña actualizada' };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ------------------ ERROR HANDLER ------------------
  private handlerErrors(error: any) {
    this.logger.error(error);
    throw new BadRequestException(error.message);
  }
}

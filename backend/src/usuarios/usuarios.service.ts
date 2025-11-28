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
<<<<<<< HEAD
import { RolUsuario } from './entities/rol-usuario.enum';
=======
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuariosRepository: Repository<UsuarioEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

<<<<<<< HEAD
  // ------------------ CREAR USUARIO ------------------
  async createUsuario(createUsuarioDto: CreateUsuarioDTO) {
    const { contrasena, rol, ...restoData } = createUsuarioDto;

    try {
      const usuario = this.usuariosRepository.create({
        ...restoData,
=======
  async createUsuario(createUsuarioDto: CreateUsuarioDTO) {
    const { contrasena, ...usuarioData } = createUsuarioDto;
    console.log(createUsuarioDto);
    try {
      const usuario = this.usuariosRepository.create({
        ...usuarioData,
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
        contrasena: bcrypt.hashSync(
          contrasena,
          Number(this.configService.get('SALT_OR_ROUNDS')),
        ),
<<<<<<< HEAD
        rol: rol.map((r) => r as RolUsuario),
      });

      await this.usuariosRepository.save(usuario);

      return {
        usuario: restoData,
        Message: 'Usuario creado',
=======
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
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

<<<<<<< HEAD
  // ------------------ LOGIN ------------------
=======
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  async loginUsuario(loginUsuarioDto: LoginUsuarioDTO) {
    const { correo, contrasena } = loginUsuarioDto;

    const usuario = await this.usuariosRepository.findOne({
<<<<<<< HEAD
      select: ['id', 'nombre_completo', 'correo', 'contrasena', 'rol'],
=======
      select: {
        id: true,
        nombre_completo: true,
        correo: true,
        contrasena: true,
        rol: true,
      },
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
      where: { correo },
    });

    if (!usuario)
<<<<<<< HEAD
      throw new NotFoundException(`Usuario con correo ${correo} no existe`);

    const passValido = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!passValido) throw new UnauthorizedException(`Contraseña incorrecta`);

    return {
      Details: {
        Message: 'Inicio de sesión exitoso',
=======
      throw new NotFoundException(`User with email: ${correo} not found`);

    const passOrNotPass = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!passOrNotPass) throw new UnauthorizedException(`Contraseña no válida`);

    return {
      Details: {
        Mesagge: 'Inicio de sesion exitoso!!',
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
        UserDetails: {
          name: usuario.nombre_completo,
          correo: usuario.correo,
        },
      },
      token: this.jwtService.sign({ rol: usuario.rol }),
    };
  }

<<<<<<< HEAD
  // ------------------ GET ALL ------------------
  async getAllUsuarios() {
    try {
      return await this.usuariosRepository.find({
        select: ['id', 'nombre_completo', 'correo', 'rol'],
      });
=======
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
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
    } catch (error) {
      this.handlerErrors(error);
    }
  }

<<<<<<< HEAD
  // ------------------ GET BY ID ------------------
  async getUsuarioById(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        select: ['id', 'nombre_completo', 'correo', 'rol'],
=======
  async getUsuarioById(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        select: {
          id: true,
          nombre_completo: true,
          correo: true,
          rol: true,
        },
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
        where: { id: Number(id) },
      });

      if (!usuario)
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

      return usuario;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
          contrasena,
          Number(this.configService.get('SALT_OR_ROUNDS')),
        );
      }

<<<<<<< HEAD
      await this.usuariosRepository.save(usuario);

      return {
        usuario,
        Message: 'Usuario actualizado',
=======
      await this.usuariosRepository.save(datosActualizados);

      return {
        usuario: {
          id,
          ...usuarioData,
        },
        Message: 'Usuario updated!!',
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

<<<<<<< HEAD
  // ------------------ DELETE ------------------
=======
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  async deleteUsuario(id: string) {
    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { id: Number(id) },
      });

<<<<<<< HEAD
      if (!usuario)
        throw new NotFoundException(`Usuario con ID ${id} no existe`);
=======
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

      await this.usuariosRepository.remove(usuario);

      return {
        message: 'Usuario eliminado correctamente',
<<<<<<< HEAD
=======
        id,
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

<<<<<<< HEAD
  // ------------------ RESET PASSWORD ------------------
  async resetPassword(correo: string, nueva: string) {
    try {
      if (!nueva) throw new BadRequestException('Debe enviar la nueva clave');
=======
  async resetPassword(correo: string, nueva: string) {
    try {
      if (!nueva || nueva.trim() === '') {
        throw new BadRequestException('La nueva contraseña es obligatoria');
      }
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

      const usuario = await this.usuariosRepository.findOne({
        where: { correo },
      });

<<<<<<< HEAD
      if (!usuario) throw new NotFoundException('Correo no existe');
=======
      if (!usuario) {
        throw new NotFoundException('Correo no encontrado');
      }
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

      usuario.contrasena = bcrypt.hashSync(
        nueva,
        Number(this.configService.get('SALT_OR_ROUNDS')),
      );

      await this.usuariosRepository.save(usuario);

<<<<<<< HEAD
      return { message: 'Contraseña actualizada' };
=======
      return { message: 'Contraseña actualizada correctamente' };
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
    } catch (error) {
      this.handlerErrors(error);
    }
  }

<<<<<<< HEAD
  // ------------------ ERROR HANDLER ------------------
  private handlerErrors(error: any) {
=======
  private handlerErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
    this.logger.error(error);
    throw new BadRequestException(error.message);
  }
}

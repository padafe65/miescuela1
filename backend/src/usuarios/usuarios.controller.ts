import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { Roles } from './roles.decorator';
import { RolUsuario } from './entities/rol-usuario.enum';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registrar')
  @Roles(RolUsuario.PROFESOR)
  registerUser(@Body() dto: CreateUsuarioDTO) {
    return this.usuariosService.createUsuario(dto);
  }

  @Post('login')
  loginUser(@Body() dto: LoginUsuarioDTO) {
    return this.usuariosService.loginUsuario(dto);
  }

  @Get('getAllUsuarios')
  getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }

  @Patch('reset-password')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ESTUDIANTE)
  resetPassword(@Body('correo') correo: string, @Body('nueva') nueva: string) {
    if (!correo || !nueva)
      throw new BadRequestException('Correo y nueva contraseña requeridos');

    return this.usuariosService.resetPassword(correo, nueva);
  }

  @Get(':id')
  getUsuarioById(@Param('id') id: string) {
    return this.usuariosService.getUsuarioById(id);
  }

  @Patch(':id')
  updateUsuario(@Param('id') id: string, @Body() dto: CreateUsuarioDTO) {
    return this.usuariosService.updateUsuario(id, dto);
  }

  @Delete(':id')
  deleteUsuario(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario(id);
  }
}

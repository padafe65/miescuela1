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

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registrar')
  registerUser(@Body() createUsuarioDto: CreateUsuarioDTO) {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }

  @Post('login')
  loginUser(@Body() loginUsuarioDto: LoginUsuarioDTO) {
    return this.usuariosService.loginUsuario(loginUsuarioDto);
  }

  @Get('getAllUsuarios')
  getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }

  @Patch('reset-password')
  resetPassword(@Body('correo') correo: string, @Body('nueva') nueva: string) {
    if (!correo || !nueva) {
      throw new BadRequestException(
        'Correo y nueva contraseña son obligatorios',
      );
    }

    return this.usuariosService.resetPassword(correo, nueva);
  }

  @Get(':id')
  getUsuarioById(@Param('id') id: string) {
    return this.usuariosService.getUsuarioById(id);
  }

  @Patch(':id')
  updateUsuario(
    @Param('id') id: string,
    @Body() updateUsuarioDto: CreateUsuarioDTO,
  ) {
    return this.usuariosService.updateUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  deleteUsuario(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario(id);
  }
}

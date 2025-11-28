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
<<<<<<< HEAD
import { Roles } from './roles.decorator';
import { RolUsuario } from './entities/rol-usuario.enum';
=======
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registrar')
<<<<<<< HEAD
  @Roles(RolUsuario.PROFESOR)
  registerUser(@Body() dto: CreateUsuarioDTO) {
    return this.usuariosService.createUsuario(dto);
  }

  @Post('login')
  loginUser(@Body() dto: LoginUsuarioDTO) {
    return this.usuariosService.loginUsuario(dto);
=======
  registerUser(@Body() createUsuarioDto: CreateUsuarioDTO) {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }

  @Post('login')
  loginUser(@Body() loginUsuarioDto: LoginUsuarioDTO) {
    return this.usuariosService.loginUsuario(loginUsuarioDto);
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  }

  @Get('getAllUsuarios')
  getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }

  @Patch('reset-password')
<<<<<<< HEAD
  @Roles(RolUsuario.PROFESOR, RolUsuario.ESTUDIANTE)
  resetPassword(@Body('correo') correo: string, @Body('nueva') nueva: string) {
    if (!correo || !nueva)
      throw new BadRequestException('Correo y nueva contraseña requeridos');
=======
  resetPassword(@Body('correo') correo: string, @Body('nueva') nueva: string) {
    if (!correo || !nueva) {
      throw new BadRequestException(
        'Correo y nueva contraseña son obligatorios',
      );
    }
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

    return this.usuariosService.resetPassword(correo, nueva);
  }

  @Get(':id')
  getUsuarioById(@Param('id') id: string) {
    return this.usuariosService.getUsuarioById(id);
  }

  @Patch(':id')
<<<<<<< HEAD
  updateUsuario(@Param('id') id: string, @Body() dto: CreateUsuarioDTO) {
    return this.usuariosService.updateUsuario(id, dto);
=======
  updateUsuario(
    @Param('id') id: string,
    @Body() updateUsuarioDto: CreateUsuarioDTO,
  ) {
    return this.usuariosService.updateUsuario(id, updateUsuarioDto);
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  }

  @Delete(':id')
  deleteUsuario(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario(id);
  }
}

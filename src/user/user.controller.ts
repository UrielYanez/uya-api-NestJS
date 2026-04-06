import { Controller, Delete, Get, Post, Put, Body, Param, HttpException, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';

@Controller('api/user')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  public async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('create')
  public async create(@Body() user: CreateUserDto) {
    const result = await this.userService.createUser(user);
    if (!result) {
      throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  @Put(':id')
  public async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    try {
      return await this.userService.updateUser(id, user);
    } catch (error) {
      throw new HttpException('Error al actualizar el usuario con id ' + id, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.deleteUser(id);
    if (!result) {
      throw new HttpException('Error al eliminar el usuario (asegúrate de que exista y no tenga tareas asignadas)', HttpStatus.CONFLICT);
    }
    return true;
  }
}
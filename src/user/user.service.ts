import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service'; // <-- Importación
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private utilService: UtilService // <-- Inyección de dependencias
  ) {}

  public async getAllUsers(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: { task: true },
      orderBy: { name: 'asc' }
    });
  }

  public async getUserById(id: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { task: true }
    });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return user;
  }

  public async createUser(user: CreateUserDto): Promise<any> {
    // 1. Encriptar la contraseña antes de guardarla
    const hashedPassword = await this.utilService.hashPassword(user.password);

    return this.prisma.user.create({
      data: {
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        password: hashedPassword // <-- Guardamos el hash, no el texto plano
      }
    });
  }

  public async updateUser(id: number, userUpdate: UpdateUserDto): Promise<any> {
    // 1. Preparamos el objeto con los datos que sí vienen en la petición
    const dataToUpdate: any = {
      name: userUpdate.name,
      lastName: userUpdate.lastName,
      username: userUpdate.username,
    };

    // 2. Si el usuario está intentando cambiar su contraseña, la encriptamos
    if (userUpdate.password) {
      dataToUpdate.password = await this.utilService.hashPassword(userUpdate.password);
    }

    // 3. Actualizamos en base de datos
    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate
    });
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
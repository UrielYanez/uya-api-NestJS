import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UtilService],
  exports: [UserService] // Lo exportamos por si el AuthModule lo necesita después
})
export class UserModule {}
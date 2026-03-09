import { Module } from '@nestjs/common';
import { AuthModule } from './auth/interfaces/auth.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './common/services/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, TaskModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

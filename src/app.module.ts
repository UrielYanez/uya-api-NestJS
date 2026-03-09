import { Module } from '@nestjs/common';
import { AuthModule } from './auth/interfaces/auth.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './common/services/prisma.service';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { updateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  public async getAllTasks(): Promise<any[]> {
    return this.prisma.task.findMany({
      orderBy: { name: 'asc' }
    });
  }

  public async GetTaskById(id: number): Promise<any> {
    return this.prisma.task.findUnique({
      where: { id }
    });
  }

  public async insertTask(task: CreateTaskDto): Promise<any> {
    return this.prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        priority: task.priority,
        userId: task.userId
      }
    });
  }

  public async updateTask(id: number, taskUpdate: updateTaskDto): Promise<any> {
    return this.prisma.task.update({
      where: { id },
      data: {
        name: taskUpdate.name,
        description: taskUpdate.description,
        priority: taskUpdate.priority,
        userId: taskUpdate.userId
      }
    });
  }

  public async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.task.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
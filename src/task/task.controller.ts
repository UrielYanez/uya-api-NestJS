import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
    constructor(private taskService: TaskService) { }
    @Get('list')
    public list(): string {
        return this.taskService.task();
    }

    @Post('create')
    public create(task: any): string {
        return this.taskService.create(task);
    }

    @Delete('delete')
    public delete(id: number): string {
        return this.taskService.delete(id);
    }

    @Put('update')
    public update(id: number, task: any): string {
        return this.taskService.update(id, task);
    }

    @Get(':id')
    public findById(id: number): string {
        return this.taskService.findById(id);
    }
}

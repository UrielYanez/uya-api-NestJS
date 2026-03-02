import {Controller, Delete, Get, Post, Put, Body, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { updateTaskDto } from './dto/update-task-dto';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('api/task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    //GetAll
    @Get()
    public async GetAllTask(): Promise<Task[]> {
        return await this.taskService.getAllTasks();
    }

    // GetById
    @Get(':id')
    public async findById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        const result = await this.taskService.GetTaskById(id);
        if (result == undefined) {
            throw new HttpException('Tarea con id ' + id + ' no encontrada', HttpStatus.NOT_FOUND);
        }
        return await this.taskService.GetTaskById(id);
    }

    // Create
    @Post('create')
    public async create(@Body() task: CreateTaskDto): Promise<Task> {
        const result = await this.taskService.insertTask(task);
        if (result == undefined) {
            throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    // Update
    @Put(':id')
    public async updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: updateTaskDto): Promise<Task> {
        const result = await this.taskService.updateTask(id, task);
        if (result == undefined) {
            throw new HttpException('Error al actualizar la tarea con id ' + id, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.taskService.updateTask(id, task);
    }

    // Delete
    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        const result = await this.taskService.delete(id);
        if (!result) {
            throw new HttpException('Error al eliminar la tarea con id ' + id, HttpStatus.NOT_FOUND);
        }
        return true;
    }

}

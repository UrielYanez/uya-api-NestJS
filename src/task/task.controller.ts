import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    public list(): string {
        return this.taskService.task();
    }
    
    // Usamos @Param('id') para extraer el ID de la URL
    @Get(':id')
    public findById(@Param('id') id: number): string {
        return this.taskService.findById(id);
    }

    // Usamos @Body() para extraer el JSON que envías desde Postman
    @Post('create')
    public create(@Body() task: any): string {
        return this.taskService.create(task);
    }

    // Actualizamos la ruta para que reciba el ID en la URL de forma más RESTful
    @Delete(':id')
    public delete(@Param('id') id: number): string {
        return this.taskService.delete(id);
    }

    // Combinamos @Param para el ID y @Body para los datos a actualizar
    @Put(':id')
    public update(@Param('id') id: number, @Body() task: any): string {
        return this.taskService.update(id, task);
    }
}
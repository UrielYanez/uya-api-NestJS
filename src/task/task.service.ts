import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService {
    public task(): string{
       return "listado de tareas";
    }

    public create(task: any): string{
        return task;
    }

    public update(id:number, task: any): string{
        return `tarea actualizada con id: ${id} y datos: ${task}`;
    }
    public delete(id:number): string{
        return `tarea eliminada con id: ${id}`;
    }   
    public findById(id:number): string{
        return `tarea encontrada por id: ${id}`;
    }   
} 
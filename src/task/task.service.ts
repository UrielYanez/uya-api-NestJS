import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  public task(): string {
    return 'Listado de tareas';
  }

  public create(task: any): string {
    return task;
  }

  public update(id: number, task: any): string {
    return `Tarea Actualizada con id: ${id} y Datos: ${task}`;
  }

  public delete(id: number): string {
    return `Tarea Eliminada con id: ${id}`;
  }

  public findById(id: number): string {
    return `Tarea Encontrada ${id}`;
  }
}

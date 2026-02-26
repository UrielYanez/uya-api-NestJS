import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('MYSQL_CONNECTION') private mysql: any,
    @Inject('POSTGRES_CONNECTION') private pg: Client,
  ) {

  }

  public async getAllTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks ORDER BY name ASC';

    const [results] = await this.mysql.query(query);
    
    return results as Task[];
  }

  public GetTaskById(id: number): string {
    return `Tarea Encontrada ${id}`;
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

  
}

import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { updateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('MYSQL_CONNECTION') private mysql: any,
    @Inject('POSTGRES_CONNECTION') private pg: Client,
  ) {}

  public async getAllTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks ORDER BY name ASC';

    const [results] = await this.mysql.query(query);

    return results as Task[];
  }

  public async GetTaskById(id: number): Promise<Task> {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    const [result] = await this.mysql.query(query, [id]);
    return result[0] as Task;
  }

  public async insertTask(task: CreateTaskDto): Promise<Task> {
  const query = 'INSERT INTO tasks (name, description, priority, user_id) VALUES (?, ?, ?, ?)';
  const values = [task.name, task.description, task.priority, task.userId];
  const [result] = await this.mysql.query(query, values); 
  const insertedId = result.insertId;
  return await this.GetTaskById(insertedId);
}

  public async updateTask(id: number, taskUpdate: updateTaskDto): Promise<Task> {
    const task = await this.GetTaskById(id);
    task.name = taskUpdate.name || task.name;
    task.description = taskUpdate.description || task.description;
    task.priority = taskUpdate.priority !== undefined ? taskUpdate.priority : task.priority;
    task.user_id = taskUpdate.userId || task.user_id;

    const query = 'UPDATE tasks SET name = ?, description = ?, priority = ?, user_id = ? WHERE id = ?';
    await this.mysql.query(query, [task.name, task.description, task.priority, task.user_id, id]);
    return await this.GetTaskById(id);
  }

  public async delete(id: number): Promise<string> {
    const query = 'DELETE FROM tasks WHERE id = ?';
    const result = await this.mysql.query(query, [id]);
    return result.affectedRows > 0 ? `Tarea con id ${id} eliminada correctamente` : `No se encontró una tarea con id ${id}`;
  }
}

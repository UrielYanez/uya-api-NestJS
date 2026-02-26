import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { mySQLProvider } from "src/common/providers/mysql.provider";
import { pgProvider } from "src/common/providers/pg.provider";

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, mySQLProvider, pgProvider] 
})
export class TaskModule {
    
}
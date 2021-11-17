import { Body, Controller, Get, Param, Post,Delete, Query, ValidationPipe, Patch, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipe';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: FilterTasksDTO): Promise<Task[]>{
        return this.tasksService.getTasks(filterDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>
    {
        return  this.tasksService.getTaskById(id);
    }
        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO);
    }
       @Delete('/:id')
       deleteTaskById(@Param('id', ParseIntPipe) id: number):Promise<void>
       {
           return this.tasksService.deleteTask(id);
    }
    @Patch('/:id')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status)
    }
    
   
  

  
}

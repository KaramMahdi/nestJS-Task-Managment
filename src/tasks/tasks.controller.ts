import { Body, Controller, Get, Param, Post,Delete, Query, ValidationPipe, Patch, UsePipes } from '@nestjs/common';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: FilterTasksDTO): Task[]{
        if(Object.keys(filterDTO).length)
        {
            return this.tasksService.getTasksWithFilters(filterDTO);
        }
        else{
            return this.tasksService.getAllTasks()
        }
    }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task
    {
        return this.tasksService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void
    {
         this.tasksService.deleteTask(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO:CreateTaskDTO):Task {
        return this.tasksService.createTask(createTaskDTO);
    }
    @Patch('/:id/status')
    updateTaskStatus(@Param("id") id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task
    {
     return this.tasksService.updateTaskStatus(id,status);
    }
  
}

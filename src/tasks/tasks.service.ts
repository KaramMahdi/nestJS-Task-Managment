import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[]=[];
    getAllTasks():Task[]{
        return this.tasks;
    }
    getTasksWithFilters(filterDTO:FilterTasksDTO):Task[]{
        const {search,status} =filterDTO;
        let tasks=this.getAllTasks();
        if(status)
        {
            tasks=tasks.filter(task=>task.status===status)
        }
        if(search)
        {
            tasks=tasks.filter(task=>
                task.title.includes(search)||
                task.description.includes(search)
            );
        }
        return tasks;
    }
    getTaskById(id:string):Task
    {
        const found=this.tasks.find(task=>task.id===id);
        if(!found)
        {
          throw new NotFoundException(`Task with ID ${id} not found`); 
        }
        return found;
    }
    deleteTask(id:string):void
    {
        const found =this.getTaskById(id);
        this.tasks= this.tasks.filter(task=>task.id !==id);
    }
    createTask(createTaskDTO:CreateTaskDTO):Task {
        const {title,description} = createTaskDTO;
        const task: Task = {
        id: uuid.v1(),
        title,
        description,
        status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task; 
        }

        updateTaskStatus(id:string,status:TaskStatus):Task
        {
        const task=this.getTaskById(id);
        task.status=status;
        return task;
        }
}

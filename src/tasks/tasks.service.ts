import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './tasks.status.enum';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTasks(filterTasksDTO: FilterTasksDTO): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterTasksDTO);
    }

    /////////-////

   // private tasks: Task[] = [];
    //getAllTasks():Task[]{
    //    return this.tasks;
    //}
    //getTasksWithFilters(filterDTO:FilterTasksDTO):Task[]{
    //    const {search,status} =filterDTO;
    //    let tasks=this.getAllTasks();
    //    if(status)
    //    {
    //        tasks=tasks.filter(task=>task.status===status)
    //    }
    //    if(search)
    //    {
    //        tasks=tasks.filter(task=>
    //            task.title.includes(search)||
    //            task.description.includes(search)
    //        );
    //    }
    //    return tasks;
    //}

    async getTaskById(id: number): Promise<Task>
    {
        const found = await this.taskRepository.findOne(id);
        if(!found)
        {
          throw new NotFoundException(`Task with ID ${id} not found`); 
        }
        return found;
    }
    async   createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
         return await this.taskRepository.createTask(createTaskDTO);
    }
    async deleteTask(id: number): Promise<void>
    {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        console.log(id)
        console.log(status)
        const taskFound = await this.getTaskById(id)
        taskFound.status = status
        await taskFound.save()
        return taskFound
    }
}

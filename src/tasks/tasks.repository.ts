import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.status.enum';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterTasksDTO: FilterTasksDTO): Promise<Task[]> {
        const { status, search } = filterTasksDTO;
        console.log(filterTasksDTO);
        const query = this.createQueryBuilder('task')
        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('(task.title LIKE :searchVal OR task.description LIKE :searchVal)', { searchVal: `%${search}%` })
        }
        const tasks = await query.getMany()
        return tasks
    }
    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO
        const newTask = new Task()
        newTask.title = title
        newTask.description = description
        newTask.status = TaskStatus.OPEN
        await newTask.save()
        return newTask
    }

}
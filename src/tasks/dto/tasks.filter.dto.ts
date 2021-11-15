import { TaskStatus } from "../task.model";

export class FilterTasksDTO {
  search:string;
  status:TaskStatus;
}
import { Component, input, model, output } from '@angular/core';
import { TaskService } from '../../../services/Task/task.service';
import { TaskAPIService } from '../../../services/Task/task-api.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-planner-list',
  standalone: true,
  imports: [],
  templateUrl: './task-planner-list.component.html',
  styleUrl: './task-planner-list.component.scss'
})
export class TaskPlannerListComponent {
  currentObject = model<Task>(new Task);
  objects = input<Task[]>();
  onSelect = output<Task>();
  onDelete = output();
  onUpdate = output();

  setCurrentObject(object:Task):void{
    this.onSelect.emit(object);
  }
}

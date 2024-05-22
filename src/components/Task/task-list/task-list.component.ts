import { Component, input, model, output } from '@angular/core';
import { TaskService } from '../../../services/Task/task.service';
import { TaskAPIService } from '../../../services/Task/task-api.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  currentObject = model<Task>(new Task);
  objects = input<Task[]>();
  onSelect = output<Task>();
  onDelete = output();
  onUpdate = output();
  
  constructor(
    private objectService:TaskService,
    private objectAPIService:TaskAPIService){
      
  }

  ngOnInit(): void {
  
  }

  setCurrentObject(object:Task):void{
    this.onSelect.emit(object);
  }

  delete(object:Task):void{
    this.objectAPIService.deleteTask(object).subscribe({
      next: (data) => {
        this.onDelete.emit();
      },
      error: (e) => console.error(e),
    });
  }

  update(object:Task){
    this.setCurrentObject(object);
    this.onUpdate.emit();
  }
}

import { Component, OnInit, model } from '@angular/core';
import { TaskEditorComponent } from '../../../components/Task/task-editor/task-editor.component';
import { TaskListComponent } from '../../../components/Task/task-list/task-list.component';
import { FamilyService } from '../../../services/Family/family.service';
import { Family } from '../../../models/family.model';
import { Task } from '../../../models/task.model';
import { TaskAPIService } from '../../../services/Task/task-api.service';
import { TaskService } from '../../../services/Task/task.service';
import { FamilyMember } from '../../../models/family-member.model';
import { TaskPlannerListComponent } from '../../../components/Task/task-planner-list/task-planner-list.component';
import { SchedularListComponent } from '../../../components/Schedualar/schedular-list/schedular-list.component';

@Component({
  selector: 'app-schedular',
  standalone: true,
  imports: [TaskPlannerListComponent,SchedularListComponent ],
  templateUrl: './schedular.page.html',
  styleUrl: './schedular.page.scss'
})
export class SchedularPage implements OnInit{

  currentFamily = model<Family>(new Family);
  public familyMembers:FamilyMember[]=[];

  tasks:Task[] = [];

  currentTask = model<Task>(new Task);

  constructor(
    private familyService: FamilyService,
    private taskAPIService:TaskAPIService,
    private taskService:TaskService,
  ){
  }
  ngOnInit(): void {
    if(this.familyService.currentFamily){
      this.currentFamily.set(this.familyService.currentFamily);
      this.setTasks();
      this.setFamilyMembers();
    }
  }

  setTasks():void{
    if(this.currentFamily().ID){
      this.taskAPIService.getAllTasksByFamily(this.currentFamily()).subscribe({
        next:(data)=>{
          this.tasks = data;
        },  
        error: (e) => console.error(e)
      })
    }
  }

  setFamilyMembers():void{
    if(this.familyService.familyMembers){
      this.familyMembers = this.familyService.familyMembers;
    }
  }

  setCurrentTask(object:Task):void{
    this.currentTask.set(object);
  }

  resetCurrentTaskMember():void{
    this.currentTask.set(new Task);
  }
}

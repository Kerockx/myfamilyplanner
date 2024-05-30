import { Component, OnInit, input, model } from '@angular/core';
import { Task } from '../../../models/task.model';
import { SchedularListItemComponent } from '../schedular-list-item/schedular-list-item.component';
import { SchedularListItem } from '../../../models/schedular-list-item.model';
import { default as moment, Moment } from 'moment'
import { SchedularService } from '../../../services/Schedular/schedular.service';
import { DefDaytime } from '../../../models/def-daytime.model';

@Component({
  selector: 'app-schedular-list',
  standalone: true,
  imports: [SchedularListItemComponent],
  templateUrl: './schedular-list.component.html',
  styleUrl: './schedular-list.component.scss'
})
export class SchedularListComponent implements OnInit {
 
  currentListMode = input(0);
  currentTask = model<Task>(new Task);
  tasks = input<Task[]>([]);
  currentSchedularListItem:SchedularListItem = new SchedularListItem();
  schedularListItems:SchedularListItem[] = [];

  defDaytimes:DefDaytime[] = [];

  constructor(private schedularService:SchedularService){

  }

  ngOnInit(): void {
    this.setSchedularListItemsInDayMode();
  }

  setCurretSchedularListItem(obj:SchedularListItem){
    this.currentSchedularListItem = obj;
    console.log(this.currentTask());
    console.log(obj);
  }

  setSchedularListItemsInDayMode():void{
    const getSchedularListItemFunction = this.schedularService.getAllDefDaytime();
    getSchedularListItemFunction.subscribe({
      next: (data) =>{
        this.schedularListItems = data;
      },
      error: (e) => console.error(e)
    })
  }

}

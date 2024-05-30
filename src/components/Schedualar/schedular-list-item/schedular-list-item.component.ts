import { Component, input, output } from '@angular/core';
import { SchedularListItem } from '../../../models/schedular-list-item.model';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-schedular-list-item',
  standalone: true,
  imports: [],
  templateUrl: './schedular-list-item.component.html',
  styleUrl: './schedular-list-item.component.scss'
})
export class SchedularListItemComponent {
  listItem = input(new SchedularListItem);
  currentTask = input(new Task);
  onSelect = output<SchedularListItem>();

  setCurrentListItem(object:SchedularListItem):void{
    this.onSelect.emit(object);
  }

}

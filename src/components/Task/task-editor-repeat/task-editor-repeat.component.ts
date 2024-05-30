import { Component, OnInit, effect, input, model, output } from '@angular/core';
import { TaskCategoryDef } from '../../../models/task-category-def.model';
import { TaskCategorySubDef } from '../../../models/task-category-sub-def.model';
import { TaskAPIService } from '../../../services/Task/task-api.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { Family } from '../../../models/family.model';
import { FamilyMember } from '../../../models/family-member.model';
import { TabzTabTasksTabFamilyMembers } from '../../../models/tabz-tab-tasks-tab-family-members.model';
import { TaskCategorySubSubDef } from '../../../models/task-category-sub-sub-def.modelmodel';
import { DefWeekday} from '../../../models/def-weekday.model';
import { DefWeekdayService } from '../../../services/DefModels/def-weekday.service';
import { DefTaskRepeat } from '../../../models/def-task-repeat.model';
import { DefService } from '../../../services/Def/def.service';
import { TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DEF_TASK_REPEAT_IDS_WITHOUT_CUSTOM_DAY_SELECT } from '../../../config/database.config';

@Component({
  selector: 'app-task-editor-repeat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TranslateModule],
  templateUrl: './task-editor-repeat.component.html',
  styleUrl: './task-editor-repeat.component.scss'
})
export class TaskEditorRepeatComponent implements OnInit {
  currentObject = model<Task>(new Task);
  onSubmit = output<Task>();

  public form:FormGroup;
  public defTaskRepeats:DefTaskRepeat[]=[];
  public customDaySelect = false;

  constructor(private formBuilder:FormBuilder,private defService:DefService,private defWeekdayService:DefWeekdayService){

    effect(() => {
      if(this.currentObject()) {
        if(this.currentObject().ID) {
          //this.setWeekdayFormArrayValues(this.weekdayFormArray,false);
        }else{
         // this.weekdayForm.reset();
        }
      }   
    });

    this.form = this.formBuilder.group({
      defTaskRepeat: new FormControl(''),
      is_monday: new FormControl(0),
      is_tuesday: new FormControl(0),
      is_wendsday: new FormControl(0),
      is_thursday: new FormControl(0),
      is_friday: new FormControl(0),
      is_saturday: new FormControl(0),
      is_sunday: new FormControl(0),
    });

    this.form.controls['defTaskRepeat'].valueChanges.subscribe(value => {   
      this.customDaySelect = !DEF_TASK_REPEAT_IDS_WITHOUT_CUSTOM_DAY_SELECT.includes(+value);
    })

  }

  ngOnInit(): void {
    this.setDefTaskRepeats();
  }

  setDefTaskRepeats(): void {
    if(this.defService.defTaskRepeats){
      this.defTaskRepeats = this.defService.defTaskRepeats;
    }
  }

  changeCheckboxValue(event:Event, formControlName:string):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.form.controls[formControlName].setValue(isChecked);
  }

  submit(){

  }


}

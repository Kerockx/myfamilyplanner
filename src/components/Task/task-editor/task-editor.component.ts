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
import moment, { Moment } from 'moment';
import { Time } from '@angular/common';


@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent implements OnInit{
  currentFamily = model.required<Family>();
  familyMembers = input<FamilyMember[]>();
  currentObject = model<Task>(new Task);
  onSubmit = output<Task>();

  public taskCategoryDefs:TaskCategoryDef[]=[];
  public taskCategorySubDefs:TaskCategorySubDef[]=[];
  public taskCategorySubSubDefs:TaskCategorySubSubDef[]=[];
  public filteredTaskCategorySubDefs:TaskCategorySubDef[]=[];
  public filteredTaskCategorySubSubDefs:TaskCategorySubSubDef[]=[];
  public currentTaskCategoryDefID:number | undefined;
  public currentTaskCategorySubDefID:number | undefined;
  public currentTaskCategorySubSubDefID:number | undefined;

  public form:FormGroup;
  public familyMemberForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private ObjectAPIService:TaskAPIService) {

    effect(() => {
      if(this.currentObject()) {
        if(this.currentObject().ID) {
          this.form.controls['nID_task_category'].setValue(this.currentObject().def_task_category_sub_sub.def_task_category_sub.nID_def_task_category);
          this.form.controls['nID_task_category_sub'].setValue(this.currentObject().def_task_category_sub_sub.nID_def_task_category_sub);
          this.form.patchValue(this.currentObject());
          this.setFormArrayValues(this.familyMemberFormArray,false);
          this.initFamilyMemberValue();
        }else{
          this.form.reset();
        }
      }   
    });

    this.form = this.formBuilder.group({
      nID_task_category : new FormControl('', [Validators.required]),
      nID_task_category_sub : new FormControl('', [Validators.required]),
      nID_task_category_sub_sub : new FormControl('', [Validators.required]),
      txt_name : new FormControl('', [Validators.required]),
      d_date : new FormControl(null),
      t_starttime : new FormControl(null),
      n_duration : new FormControl('', [Validators.required]),
    });

    this.familyMemberForm = this.formBuilder.group({
      familyMembers: new FormArray([])
    });

    this.form.controls['nID_task_category'].valueChanges.subscribe(value => {
      this.resetFormControl(this.form,'nID_task_category_sub')
      this.filterCategorySubDefs(value);
      this.currentTaskCategoryDefID = value;
    })

    this.form.controls['nID_task_category_sub'].valueChanges.subscribe(value => {
      this.resetFormControl(this.form,'nID_task_category_sub_sub')
      this.filterCategorySubSubDefs(value);
      this.currentTaskCategorySubDefID = value;
    })

    this.form.controls['nID_task_category_sub_sub'].valueChanges.subscribe(value => {
      this.resetFormControl(this.form,'n_duration')
      this.setTaskDuration(value);
      this.currentTaskCategorySubSubDefID = value;
    })
  }

  resetFormControl(form:FormGroup,value:string):void{
    form.controls[value].reset();
  }

  get familyMemberFormArray() {
    return this.familyMemberForm.controls['familyMembers'] as FormArray;
  }

  setFormArrayValues(formArray:FormArray, value:any) {
    formArray.controls.forEach(control => {
      control.setValue(value);
    });
  }

  initFamilyMemberValue(){
    if(this.currentObject().tabz_tab_tasks_tab_family_members){
      this.currentObject().tabz_tab_tasks_tab_family_members?.forEach((familyMember:TabzTabTasksTabFamilyMembers) =>{
        const index = this.familyMembers()!.findIndex(obj => obj.ID === familyMember.nID_family_member);
        this.familyMemberFormArray.at(index).setValue(true);
      })
    } 
  }

  changeFamilyMemberValue(event:Event, index:number):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.familyMemberFormArray.at(index).setValue(isChecked);
  }
  
 
  ngOnInit(): void {
    this.setCategoryDefs();
    this.setCategorySubDefs();
    this.setCategorySubSubDefs();
    if(this.familyMembers()){
      this.familyMembers()!.forEach(() => this.familyMemberFormArray.push(new FormControl()));
    }
    
  }

  setCategoryDefs():void{
    this.ObjectAPIService.getAllTaskCategoryDefs().subscribe({
      next: (data) => {
        this.taskCategoryDefs=data;
      },
      error: (e) => console.error(e),
    });
  }

  setCategorySubDefs():void{
    this.ObjectAPIService.getAllTaskCategorySubDefs().subscribe({
      next: (data) => {
        this.taskCategorySubDefs=data;
      },
      error: (e) => console.error(e),
    });
  }
  setCategorySubSubDefs():void{
    this.ObjectAPIService.getAllTaskCategorySubSubDefs().subscribe({
      next: (data) => {
        this.taskCategorySubSubDefs=data;
      },
      error: (e) => console.error(e),
    });
  }

  filterCategorySubDefs(value:number):void{
    this.filteredTaskCategorySubDefs = this.taskCategorySubDefs.filter((obj:TaskCategorySubDef) => obj.nID_def_task_category === +value);
  }

  filterCategorySubSubDefs(value:number):void{
    this.filteredTaskCategorySubSubDefs = this.taskCategorySubSubDefs.filter((obj:TaskCategorySubSubDef) => obj.nID_def_task_category_sub === +value);
  }

  setTaskDuration(value:number){
    let duration = this.taskCategorySubSubDefs.find((obj:TaskCategorySubSubDef) => obj.ID === +value)?.n_duration;
    this.form.controls['n_duration'].setValue(duration);
  }

  submit(){
    if(this.form.valid){
      if(this.currentObject().ID){
        this.update();
      }else{
        this.create();
      }
    }
  }

 

  update(){
    if(this.currentObject().ID){
      let object: Task = this.form.value;
      object.family_members = this.getFamilyMembers();
      if(this.form.controls['t_starttime'].value){
        const starttime = moment(this.form.controls['t_starttime'].value, "hh:mm:ss");
        object.t_starttime = starttime;
      }
      this.ObjectAPIService.updateTask(this.currentObject(),object).subscribe({
        next: (data) => {
          //this.form.reset();
          this.setFormArrayValues(this.familyMemberFormArray,false)
          this.onSubmit.emit(data);
        },  
        error: (e) => console.error(e)
      });
    }  
  }

  create(){    
    if (this.currentFamily().ID) {  
      let object: Task = this.form.value;
      object.nID_family = this.currentFamily().ID!;
      object.family_members = this.getFamilyMembers();
      this.ObjectAPIService.createTask(object).subscribe({
          next: (data) => {
           // this.form.reset();
            this.setFormArrayValues(this.familyMemberFormArray,false)
            this.onSubmit.emit(data);
          },
          error: (e) => console.error(e),
      });
    }
  }

  cancel():void{
    this.currentObject.set(new Task);
  }

  getFamilyMembers():number[]{
    const selectedFamilyMemberIDs = this.familyMemberForm.value.familyMembers
    .map((checked:any, i:any) => checked ? this.familyMembers()![i].ID : null)
    .filter((v:any) => v !== null);

    return  selectedFamilyMemberIDs
  }

 

}

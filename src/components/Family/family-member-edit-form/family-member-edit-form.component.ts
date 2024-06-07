import { Component, input, effect, output, model, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Family } from '../../../models/family.model';
import { FamilyAPIService } from '../../../services/Family/family-api.service';
import { DefFamilyMemberType } from '../../../models/def-family-member-type.model';
import { FamilyMember } from '../../../models/family-member.model';
import { DefActivity } from '../../../models/def-activity.model';

class Settings{
  name?:boolean;
  mainActivity?:boolean;
  cancelBtn?:boolean;
}

@Component({
  selector: 'family-member-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './family-member-edit-form.component.html',
  styleUrl: './family-member-edit-form.component.scss'
})
export class FamilyMemberEditFormComponent implements OnInit {
  defFamilyMemberTypes = input.required<DefFamilyMemberType[]>();
  defMainActivities = input.required<DefActivity[]>();
  familyMember = input.required<FamilyMember>();

  settings = input<Settings>();
  cancelBtn = input<boolean>();
  onCreate = output<Family>();
  onCancel = output();
  onMainActivityChange = output<DefActivity>();

  public form:FormGroup;

  constructor(
    private formBuilder:FormBuilder){

    this.form = this.formBuilder.group({
      nID_mainActivity : new FormArray([])
    });

    effect(() => {

    });
  }

  ngOnInit(): void {
    this.defMainActivities().forEach(() => this.mainActivityFormArray.push(new FormControl()));
  }

  get mainActivityFormArray() {
    return this.form.controls['nID_mainActivity'] as FormArray;
  }

  setFormArrayValues(formArray:FormArray, value:any) {
    formArray.controls.forEach(control => {
      control.setValue(value);
    });
  }

  changeMainActivityValue(event:Event, index:number):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.mainActivityFormArray.at(index).setValue(isChecked);
    this.onMainActivityChange.emit(this.defMainActivities()[index])
  }

  cancel():void{
    this.onCancel.emit();
  }
}

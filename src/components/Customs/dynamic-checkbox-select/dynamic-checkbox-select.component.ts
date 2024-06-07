import { Component, input, effect, output, model, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

class Settings{
  
}

@Component({
  selector: 'custom-dynamic-checkbox-select',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './dynamic-checkbox-select.component.html',
  styleUrl: './dynamic-checkbox-select.component.scss'
})
export class DynamicCheckboxSelectComponent {
  objects = input.required<any[]>();
  settings = input<Settings>();
  onChange = output<any>();

  public form:FormGroup;

  constructor(
    private formBuilder:FormBuilder){

    this.form = this.formBuilder.group({
      objectID : new FormArray([])
    });

    effect(() => {

    });
  }

  ngOnInit(): void {
    this.objects().forEach(() => this.formArray.push(new FormControl()));
  }

  get formArray() {
    return this.form.controls['objectID'] as FormArray;
  }

  setFormArrayValues(formArray:FormArray, value:any) {
    formArray.controls.forEach(control => {
      control.setValue(value);
    });
  }

  changeValue(event:Event, index:number):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.formArray.at(index).setValue(isChecked);
    this.onChange.emit({
      object:this.objects()[index],
      value: isChecked,
      index:index
      }
    )
  }
}

import { Component, input, effect, output, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Family } from '../../../models/family.model';
import { FamilyAPIService } from '../../../services/Family/family-api.service';

class Settings{
  name?:boolean;
  cancelBtn?:boolean;
}

@Component({
  selector: 'form-family-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './family-create.component.html',
  styleUrl: './family-create.component.scss'
})
export class FamilyCreateComponent {
  settings = input<Settings>();
  cancelBtn = input<boolean>();
  onCreate = output<Family>();
  onCancel = output();

  public form:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private objectAPIService:FamilyAPIService){

    this.form = this.formBuilder.group({
      txt_name : new FormControl('', [Validators.required]),
    });

    effect(() => {

    });
  }

  create() {
    let object: Family = this.form.value;
    this.objectAPIService.createFamily(object)
      .subscribe({
        next: (result) => {
          this.onCreate.emit(result);
        },
        error: (error) => {
          console.error('Error creating family:', error);
        }
      });
  }

  cancel():void{
    this.onCancel.emit();
  }
}

import { Component, input, effect, Input, signal, model, ModelSignal, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Family } from '../../../models/family.model';
import { FamilyAPIService } from '../../../services/Family/family-api.service';
import { FamilyMemberEditorComponent } from '../family-member-editor/family-member-editor.component';

@Component({
  selector: 'app-family-editor',
  standalone: true,
  imports: [ReactiveFormsModule,FamilyMemberEditorComponent],
  templateUrl: './family-editor.component.html',
  styleUrl: './family-editor.component.scss'
})
export class FamilyEditorComponent {
  currentObject = model<Family>(new Family);
  onSubmit = output<Family>();
  onCancel = output();

  public form:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private objectAPIService:FamilyAPIService){

    this.form = this.formBuilder.group({
      txt_name : new FormControl('', [Validators.required]),
      groupCount : new FormControl(0)
    });

    effect(() => {
      if(this.currentObject()) {
        if(this.currentObject().ID) {
          this.form.patchValue(this.currentObject());
        }else{
          this.form.reset();
        }
      }   
    });
  }

  submit(){
    if(this.currentObject().ID){
      this.update();
    }else{
      this.create();
    }
  }

  update(){
    if(this.currentObject().ID){
      let object:Family = this.form.value;   
      this.objectAPIService.updateFamily(this.currentObject(),object).subscribe({
        next: (data) => {
          this.onSubmit.emit(data);
        },  
        error: (e) => console.error(e)
      });
    }  
  }

  create(){
    let object:Family = this.form.value;
    this.objectAPIService.createFamily(object).subscribe({
      next: (data) => {
        this.onSubmit.emit(data);
      },  
      error: (e) => console.error(e)
    });
  }

  cancel():void{
    this.onCancel.emit();
  }
}

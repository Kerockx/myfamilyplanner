import { Component, input, effect, Input, signal, model, ModelSignal, output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Family } from '../../../models/family.model';
import { FamilyAPIService } from '../../../services/Family/family-api.service';
import { FamilyMember } from '../../../models/family-member.model';
import { FamilyMemberDef } from '../../../models/family-member-def.model';

@Component({
  selector: 'app-family-member-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './family-member-editor.component.html',
  styleUrl: './family-member-editor.component.scss'
})
export class FamilyMemberEditorComponent implements OnInit {
  currentFamily = model.required<Family>();
  currentObject = model<FamilyMember>(new FamilyMember);
  onSubmit = output<FamilyMember>();

  public form:FormGroup;
  public familyMemberDefs:FamilyMemberDef[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private objectAPIService:FamilyAPIService){

    this.form = this.formBuilder.group({
      txt_name : new FormControl('', [Validators.required]),
      nID_def_family_member : new FormControl('', [Validators.required]),
    });

    effect(() => {
      if(this.currentObject().ID) {
        this.form.patchValue(this.currentObject());
      }else{
        this.form.reset();
      }        
    });
  }

  ngOnInit(): void {
    this.setFamilieMemberDefs();
  }

  setFamilieMemberDefs():void{
    this.objectAPIService.getAllFamilyMemberDefs().subscribe({
      next: (data) => {
        this.familyMemberDefs = data;
      },
      error: (e) => console.error(e),
    });
  }

  submit(){
    console.log(this.currentFamily().ID);
    if(this.currentObject().ID){
      this.update();
    }else{
      this.create();
    }
  }

  update(){
    if(this.currentObject().ID){
      let object:FamilyMember = this.form.value;  
      this.objectAPIService.updateFamilyMember(this.currentObject(),object).subscribe({
        next: (data) => {
          this.form.reset();
          this.onSubmit.emit(data);
        },  
        error: (e) => console.error(e)
      });
    }  
  }

  create(){    
    if (this.currentFamily().ID) {
      let object: FamilyMember = this.form.value;
      object.nID_family = this.currentFamily().ID!;
      this.objectAPIService.createFamilyMember(object).subscribe({
          next: (data) => {
            this.form.reset();
            this.onSubmit.emit(data);
          },
          error: (e) => console.error(e),
      });
    }
  }

  cancel():void{
    this.currentObject.set(new FamilyMember);
  }
}

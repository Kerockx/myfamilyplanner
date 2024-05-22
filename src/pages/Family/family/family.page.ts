import { Component, effect, model } from '@angular/core';
import { FamilyEditorComponent } from '../../../components/Family/family-editor/family-editor.component';
import { FamilyListComponent } from '../../../components/Family/family-list/family-list.component';
import { Family } from '../../../models/family.model';
import { FamilyService } from '../../../services/Family/family.service';
import { FamilyAPIService } from '../../../services/Family/family-api.service';
import { FamilyMemberListComponent } from '../../../components/Family/family-member-list/family-member-list.component';
import { FamilyMemberEditorComponent } from '../../../components/Family/family-member-editor/family-member-editor.component';
import { FamilyMember } from '../../../models/family-member.model';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [FamilyListComponent,FamilyEditorComponent,FamilyMemberListComponent,FamilyMemberEditorComponent],
  templateUrl: './family.page.html',
  styleUrl: './family.page.scss'
})
export class FamilyPage {
  familys:Family[] = [];
  familyMembers:FamilyMember[] = [];
  currentFamily = model<Family>(new Family);
  currentFamilyMember = model<FamilyMember>(new FamilyMember);
  familyUpdateProcess = false;
  
  constructor(
    private familyService:FamilyService,
    private familyAPIService:FamilyAPIService){    
      effect(() => {
        if(this.currentFamily().ID){
          this.setFamilyMembers();
        }
      });
  }

  ngOnInit(): void {
    this.setFamilys();
    if(this.familyService.currentFamily){
      this.currentFamily.set(this.familyService.currentFamily);
    }
  }

  setFamilys():void{
    this.familyAPIService.getAllFamilys().subscribe({
      next:(data)=>{
        this.familys = data;
      },  
      error: (e) => console.error(e)
    })
  }

  setFamilyMembers():void{
    if(this.currentFamily().ID){
      this.familyAPIService.getAllFamilyMembersByFamily(this.currentFamily()).subscribe({
        next:(data)=>{
          this.familyService.familyMembers = data;
          this.familyMembers = data;         
        },  
        error: (e) => console.error(e)
      })
    }
  }

  setCurrentFamily(object:Family):void{
    this.currentFamily.set(object);
    this.familyService.currentFamily = object;
    this.setFamilyMembers();
    this.resetCurrentFamilyMember();
  }

  setCurrentFamilyMember(object:FamilyMember):void{
    this.currentFamilyMember.set(object);
  }

  resetCurrentFamilyMember():void{
    this.currentFamilyMember.set(new FamilyMember);
  }

  setFamilyUpdateProcess(value:boolean):void{
    this.familyUpdateProcess = value;
  }
}

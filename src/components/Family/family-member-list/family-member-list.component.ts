import { Component, OnInit, effect, input, model, output } from '@angular/core';
import { FamilyMember } from '../../../models/family-member.model';
import { FamilyService } from '../../../services/Family/family.service';
import { FamilyAPIService } from '../../../services/Family/family-api.service';

@Component({
  selector: 'app-family-member-list',
  standalone: true,
  imports: [],
  templateUrl: './family-member-list.component.html',
  styleUrl: './family-member-list.component.scss'
})
export class FamilyMemberListComponent {
  currentObject = model<FamilyMember>(new FamilyMember);
  objects = input<FamilyMember[]>();
  onDelete = output();
  
  
  constructor(
    private objectService:FamilyService,
    private objectAPIService:FamilyAPIService,
  ){
    effect(() => {
      
    });
  }

  ngOnInit(): void {
  
  }


  setCurrentObject(object:FamilyMember):void{
    this.currentObject.set(object);
  }

  delete(object:FamilyMember):void{
    this.objectAPIService.deleteFamilyMember(object).subscribe({
      next: (data) => {
        this.onDelete.emit();
      },
      error: (e) => console.error(e),
    });
  }

}

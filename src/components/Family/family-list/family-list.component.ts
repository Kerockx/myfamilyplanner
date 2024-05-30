import { Component, OnInit, effect, input, model, output } from '@angular/core';
import { Family } from '../../../models/family.model';
import { FamilyService } from '../../../services/Family/family.service';
import { FamilyAPIService } from '../../../services/Family/family-api.service';

@Component({
  selector: 'app-family-list',
  standalone: true,
  imports: [],
  templateUrl: './family-list.component.html',
  styleUrl: './family-list.component.scss'
})
export class FamilyListComponent {

  currentObject = model<Family>(new Family);
  objects = input<Family[]>();
  onSelect = output<Family>();
  onDelete = output();
  onUpdate = output();
  
  constructor(
    private objectService:FamilyService,
    private objectAPIService:FamilyAPIService){
    effect(() => {
      
    });
  }

  ngOnInit(): void {
  
  }

  setCurrentObject(object:Family):void{
    this.onSelect.emit(object);
    //this.currentObject.set(object);
  }

  delete(object:Family):void{
    this.objectAPIService.deleteFamily(object).subscribe({
      next: (data) => {
        this.onDelete.emit();
      },
      error: (e) => console.error(e),
    });
  }

  update(object:Family){
    this.onSelect.emit(object);
    this.onUpdate.emit();
  }

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../navigation/nav-bar/nav-bar.component';
import { FamilyService } from '../services/Family/family.service';
import { FamilyAPIService } from '../services/Family/family-api.service';
import { Family } from '../models/family.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FamilyPlanner';

  constructor(private familyService:FamilyService, private familyAPIService:FamilyAPIService){
    let family:Family = new Family();
    family.ID = 1;
    this.familyAPIService.getFamily(family).subscribe({
      next: (data) => {
        this.familyService.currentFamily = data;
        this.familyAPIService.getAllFamilyMembersByFamily(data).subscribe({
          next:(data)=>{
            this.familyService.familyMembers = data;
          },  
          error: (e) => console.error(e)
        })
      },  
      error: (e) => console.error(e)
    });
  }

}

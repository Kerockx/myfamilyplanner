import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FamilyAPIService } from '../../services/Family/family-api.service';
import { Family } from '../../models/family.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FamilyService } from '../../services/Family/family.service';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  familys:Family[] = [];
  familyFormControl = new FormControl

  constructor(
    private router:Router,
    private authService:AuthService,
    private familyAPIService:FamilyAPIService,
    private familyService:FamilyService){    
    this.familyFormControl.valueChanges.subscribe((value:number) =>{
      let family = this.familys.find((obj: Family) => obj.ID === +value);
      if(family){
        this.familyService.currentFamily = family;
        this.router.navigate(['/dashboard']);
      }
    })
  }
  
  ngOnInit(): void {
    this.setFamilys();
  }

  setFamilys():void{
    this.familyAPIService.getAllFamilys().subscribe({
      next:(data)=>{
        this.familys = data;
      },  
      error: (e) => console.error(e)
    })
  }

  logout(): void {
    this.authService.logoutUser();
  }

}

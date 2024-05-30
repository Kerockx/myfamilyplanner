import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../navigation/nav-bar/nav-bar.component';
import { FamilyService } from '../services/Family/family.service';
import { FamilyAPIService } from '../services/Family/family-api.service';
import { Family } from '../models/family.model';
import { Storage } from '@ionic/storage-angular';
import { TaskAPIService } from '../services/Task/task-api.service';
import { Task } from '../models/task.model';
import { DefAPIService } from '../services/Def/def-api.service';
import { DefService } from '../services/Def/def.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'FamilyPlanner';

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private defAPIService:DefAPIService,
    private defService:DefService,
    private taskAPIService: TaskAPIService,
    private familyService:FamilyService,
    private familyAPIService:FamilyAPIService){
      
    translate.setDefaultLang('de');
    translate.use('de');

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

  setDefTaskRepeats(){
    this.defAPIService.getAllDefTaskRepeats().subscribe({
      next: (data) => {
        this.defService.defTaskRepeats = data;
      },  
      error: (e) => console.error(e)
    });
  }

  initDefs(){
    this.setDefTaskRepeats();
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    this.initDefs();
    await this.storage.create();
  }

}

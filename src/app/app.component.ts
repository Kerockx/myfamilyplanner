import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../navigation/nav-bar/nav-bar.component';
import { FamilyService } from '../services/Family/family.service';
import { FamilyAPIService } from '../services/Family/family-api.service';
import { Family } from '../models/family.model';
import { Storage } from '@ionic/storage-angular';
import { DefAPIService } from '../services/Def/def-api.service';
import { DefService } from '../services/Def/def.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root', // Selektor f�r die Komponente
  standalone: true, // Standalone-Komponente ohne Elternkomponente
  imports: [RouterOutlet, NavBarComponent], // Import von RouterOutlet und NavBarComponent (sollte hier 'declarations' sein)
  templateUrl: './app.component.html', // URL des Templates der Komponente
  styleUrl: './app.component.scss' // URL der Styles f�r die Komponente
})
export class AppComponent {
  title = 'FamilyPlanner'; // Titel der Anwendung

  constructor(
    private familyService: FamilyService,
    private familyAPIService: FamilyAPIService,
    private storage: Storage,
    private defAPIService: DefAPIService,
    private defService: DefService,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('de'); // Setzen der Standardsprache f�r die �bersetzung
    this.translate.use('de'); // Verwenden der deutschen Sprache f�r die �bersetzung
  }

  // Methode zur Initialisierung der aktuellen Familie und ihrer Mitglieder
  // Input: Keiner
  // Output: Keiner
  // Diese Methode ruft die aktuelle Familie und ihre Mitglieder �ber die `FamilyAPIService` ab und setzt sie dann im `FamilyService`.
  setCurrentFamily() {
    let family: Family = new Family(); // Initialisierung einer neuen Family-Instanz
    family.ID = 1; // Setzen der ID der Familie
    this.familyAPIService.getFamily(family).subscribe({
      next: (data) => { // Erfolgreicher Aufruf
        this.familyService.currentFamily = data; // Setzen der aktuellen Familie im FamilyService
        this.familyAPIService.getAllFamilyMembersByFamily(data).subscribe({
          next: (data) => { // Erfolgreicher Aufruf
            this.familyService.familyMembers = data; // Setzen der Familienmitglieder im FamilyService
          },
          error: (e) => console.error(e) // Fehlerbehandlung
        })
      },
      error: (e) => console.error(e) // Fehlerbehandlung
    });
  }

  // Methode zur Initialisierung der Task-Wiederholungen
  // Input: Keiner
  // Output: Keiner
  // Diese Methode ruft Daten von der `DefAPIService` ab und setzt sie im `DefService` f�r die weitere Verwendung in der Anwendung.
  setDefTaskRepeats() {
    this.defAPIService.getAllDefTaskRepeats().subscribe({
      next: (data) => { // Erfolgreicher Aufruf
        this.defService.defTaskRepeats = data; // Setzen der Task-Wiederholungen im DefService
      },
      error: (e) => console.error(e) // Fehlerbehandlung
    });
  }

  // Methode zur Initialisierung der Familienmitgliedstypen
  // Input: Keiner
  // Output: Keiner
  // Diese Methode ruft Daten von der `DefAPIService` ab und setzt sie im `DefService` f�r die weitere Verwendung in der Anwendung.
  setDefFamilyMemberTypes() {
    this.defAPIService.getAllDefFamilyMemberTypes().subscribe({
      next: (data) => { // Erfolgreicher Aufruf
        this.defService.defFamilyMemberTypes = data; // Setzen der Familienmitgliedstypen im DefService
      },
      error: (e) => console.error(e) // Fehlerbehandlung
    });
  }

  // Methode zur Initialisierung der Aktivit�tskategorien
  // Input: Keiner
  // Output: Keiner
  // Diese Methode ruft Daten von der `DefAPIService` ab und setzt sie im `DefService` f�r die weitere Verwendung in der Anwendung.
  setDefActivityCateroies() {
    this.defAPIService.getAllDefActivityCategories().subscribe({
      next: (data) => { // Erfolgreicher Aufruf
        this.defService.defActiviyCategories = data; // Setzen der Aktivit�tskategorien im DefService
      },
      error: (e) => console.error(e) // Fehlerbehandlung
    });
  }

  // Methode zur sequenziellen Initialisierung verschiedener Definitionsdaten
  // Input: Keiner
  // Output: Keiner
  // Diese Methode ruft sequenziell die Methoden auf, um verschiedene Definitionsdaten zu initialisieren.
  initDefs() {
    this.setDefTaskRepeats(); // Initialisierung der Task-Wiederholungen
    this.setDefFamilyMemberTypes(); // Initialisierung der Familienmitgliedstypen
    this.setDefActivityCateroies(); // Initialisierung der Aktivit�tskategorien
  }

  // Input: Keiner
  // Output: Keiner
  // Diese Methode wird aufgerufen, um die aktuelle Familie zu setzen, dann werden Definitionsdaten initialisiert und zuletzt wird die Storage-Initialisierung abgewartet.
  async ngOnInit() {
    this.setCurrentFamily(); // Setzen der aktuellen Familie
    this.initDefs(); // Initialisieren der Definitionsdaten
    await this.storage.create(); // Erstellen des Storage
  }

}

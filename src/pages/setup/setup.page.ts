// Importieren von Modulen und Klassen aus Angular und anderen benutzerdefinierten Dateien
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { DefActivity } from '../../models/def-activity.model';
import { DefActivityCategory } from '../../models/def-activity-category.model';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';
import { DefService } from '../../services/Def/def.service';
import { DynamicCheckboxSelectComponent } from '../../components/Customs/dynamic-checkbox-select/dynamic-checkbox-select.component';
import { Family } from '../../models/family.model';
import { FamilyCreateComponent } from '../../components/Family/family-create/family-create.component';
import { FamilyMember } from '../../models/family-member.model';
import { FamilyMemberData } from '../../interfaces/family-member-data.interface';
import { FamilyMemberEditFormComponent } from '../../components/Family/family-member-edit-form/family-member-edit-form.component';
import { FamilyService } from '../../services/Family/family.service';
import { SetupFamilyAPIService } from '../../services/Family/setup-family-api.service';
import { SetupFamilyData } from '../../interfaces/setup-family-data.interface';
import { UserService } from '../../services/User/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


// Klasse f�r die Z�hlung der Familienmitglieder
class FamilyMemberCount {
  ID!: number;
  count!: number;
}

// Deklaration der Angular Komponente
@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FamilyCreateComponent,
    FamilyMemberEditFormComponent,
    DynamicCheckboxSelectComponent,
    TranslateModule,
  ],
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  // Deklaration von Variablen und Eigenschaften der Komponente
  public currentFamily: Family | undefined;
  public defActivityCategories: DefActivityCategory[] = [];
  public defFamilyMemberTypes: DefFamilyMemberType[] = [];
  public defMainActivities: DefActivity[] = [];
  public familyForm: FormGroup;
  public familyMemberCounts: FamilyMemberCount[] = [];
  public familyMembers: FamilyMember[] = [];
  public lastSetupState = 3;
  public setupFamilyData: SetupFamilyData = new SetupFamilyData();
  public setupState = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private defService: DefService,
    private familyService: FamilyService,
    private formBuilder: FormBuilder,
    private setupFamilyAPIService: SetupFamilyAPIService,
    private translate: TranslateService,
    private userService: UserService,
  ) {
    // Initialisierung beim Erstellen der Komponente
    this.initializeDefinitions(); // Initialisierung der Definitionen
    this.familyForm = this.formBuilder.group({ // Erstellung des Familienformulars
      txt_name: new FormControl('', [Validators.required]), // Name des Familienformulars
    });
    this.initializeFamilyMemberCounts(); // Initialisierung der Z�hlung der Familienmitglieder
  }

  ngOnInit(): void {
    // Leer, da keine spezifischen Aktionen beim Initialisieren der Komponente erforderlich sind
  }

  // Methode zum Initialisieren der Familienmitglieder-Typen, Aktivit�tskategorien usw.
  // Eingabe: Keine
  // Ausgabe: Keine
  private async initializeDefinitions() {
    // Initialisiere Familienmitgliedertypen aus dem Service und erhalte eine Promise
    this.defFamilyMemberTypes = await firstValueFrom(this.defService.getAllDefFamilyMemberTypes(this.activatedRoute));
    // Initialisiere Z�hlung der Familienmitglieder
    this.initializeFamilyMemberCounts();
    // Initialisiere Aktivit�tskategorien aus dem Service und erhalte eine Promise
    this.defActivityCategories = await firstValueFrom(this.defService.getAllDefActivityCategories(this.activatedRoute));
    // Initialisiere Hauptaktivit�ten aus dem Service und erhalte eine Promise
    this.defMainActivities = await firstValueFrom(this.defService.getAllDefMainActivities(this.activatedRoute));
    // Initialisiere den aktuellen Benutzer aus dem Snapshot
    this.setupFamilyData.user = this.userService.getCurrentUserFromSnapshot(this.activatedRoute);
  }

  // Methode zum Initialisieren der Z�hlung der Familienmitglieder-Typen
  // Eingabe: Keine
  // Ausgabe: Keine
  private initializeFamilyMemberCounts() {
    // Iteriere durch die Familienmitglieder-Typen und initialisiere die Z�hlung f�r jeden Typ
    this.defFamilyMemberTypes.forEach((type: DefFamilyMemberType) => {
      if (type.ID) {
        this.familyMemberCounts.push({ ID: type.ID, count: 0 }); // F�ge einen Eintrag f�r jeden Typ hinzu
      }
    });
  }

  // Methode zum Festlegen des Setup-Zustands
  // Eingabe: value - Wert, um den der Setup-Zustand erh�ht wird (normalerweise 1 oder -1)
  // Ausgabe: Keine
  setSetupState(value: number) {
    // Festlegen des Setup-Zustands basierend auf den �bergebenen Werten
    // und �berpr�fung auf G�ltigkeit des Familienformulars
    if (this.setupState === 0 && value === 1 && this.familyForm.valid) {
      this.setupFamilyData.family = this.familyForm.value;
      this.setupState += value;
    } else {
      this.setupState += value;
    }

    // Starte die Setup-Familienlogik, wenn der letzte Schritt erreicht ist
    if (this.setupState === this.lastSetupState) {
      this.SetupFamily();
    }
  }

  // Methode zum Hinzuf�gen einer Familie zum Setup
  // Eingabe: Keine
  // Ausgabe: Keine
  AddFamily() {
    // Familie zum SetupFamilyData hinzuf�gen
    this.setupFamilyData.family = this.familyForm.value;
  }

  // Methode zum Hinzuf�gen eines

  // Methode zum Hinzuf�gen eines Familienmitglieds basierend auf dem Familienmitgliedstyp
  // Eingabe: type - Der Typ des Familienmitglieds, das hinzugef�gt werden soll
  // Ausgabe: Keine
  AddFamilyMember(type: DefFamilyMemberType): void {
    // Familienmitglied erstellen
    let familyMember = new FamilyMember();
    familyMember.nID_def_family_member_type = type.ID;
    let count = this.GetFamilyMemberTypeCount(type);

    // Setze den Namen des Familienmitglieds basierend auf der Anzahl �hnlicher Mitglieder
    familyMember.txt_name = count > 0 
      ? `${this.translate.instant(type.txt_name)} ${count + 1}` 
      : `${this.translate.instant(type.txt_name)}`;

    let familyMemberData: FamilyMemberData = { familyMember };
    this.setupFamilyData.familyMemberData.push(familyMemberData);
    this.setupFamilyData.familyMemberData.sort(
      (a, b) => a.familyMember.nID_def_family_member_type - b.familyMember.nID_def_family_member_type
    );
    this.updateFamilyMemberCount(type.ID, 1); // Z�hle das hinzugef�gte Familienmitglied
  }

  // Methode zum Abrufen der Anzahl von Familienmitgliedern eines bestimmten Typs
  // Eingabe: type - Der Typ des Familienmitglieds, dessen Anzahl abgerufen werden soll
  // Ausgabe: Die Anzahl der Familienmitglieder des angegebenen Typs
  GetFamilyMemberTypeCount(type: DefFamilyMemberType): number {
    return this.setupFamilyData.familyMemberData.filter(
      (obj) => obj.familyMember.nID_def_family_member_type === type.ID
    ).length; // Filtere Familienmitglieder nach Typ und erhalte die Anzahl
  }

  // Methode zum Entfernen eines Familienmitglieds eines bestimmten Typs
  // Eingabe: type - Der Typ des Familienmitglieds, das entfernt werden soll
  // Ausgabe: Keine
  RemoveFamilyMember(type: DefFamilyMemberType): void {
    if (type.ID) {
      let index = this.setupFamilyData.familyMemberData
        .map((obj) => obj.familyMember.nID_def_family_member_type)
        .lastIndexOf(type.ID); // Finde den Index des zu entfernenden Familienmitglieds
      if (index !== -1) {
        this.setupFamilyData.familyMemberData.splice(index, 1); // Entferne das Familienmitglied aus der Liste
        this.updateFamilyMemberCount(type.ID, -1); // Aktualisiere die Z�hlung der Familienmitglieder
      }
    }
  }

  // Methode zum Aktualisieren der Z�hlung von Familienmitgliedern eines bestimmten Typs
  // Eingabe: typeID - Die ID des Typs des Familienmitglieds, dessen Z�hlung aktualisiert werden soll
  //          delta - Die �nderung der Z�hlung (positiv f�r Hinzuf�gen, negativ f�r Entfernen)
  // Ausgabe: Keine
  updateFamilyMemberCount(typeID: number, delta: number) {
    let objIndex = this.familyMemberCounts.findIndex((obj) => obj.ID === typeID); // Finde den Index des Typs
    if (objIndex !== -1) {
      this.familyMemberCounts[objIndex].count += delta; // Aktualisiere die Z�hlung um delta
    }
  }

  // Methode zum Setzen der Hauptaktivit�t f�r ein Familienmitglied
  // Eingabe: event - Das Ereignis, das die Auswahl der Hauptaktivit�t ausgel�st hat
  //          index - Der Index des Familienmitglieds in der Liste
  // Ausgabe: Keine
  SetMainActivity(event: any, index: number) {
    // Setze die Hauptaktivit�t f�r das Familienmitglied
    if (event.value) {
      this.setupFamilyData.familyMemberData[index].mainActivity = this.defMainActivities[event.index];
    } else {
      this.setupFamilyData.familyMemberData[index].mainActivity = undefined;
    }
  }

  // Methode zum Einrichten der Familie und �bermitteln der Daten an den API-Service
  // Eingabe: Keine (nutzt die Daten aus dem SetupFamilyData-Objekt)
  // Ausgabe: Keine (setzt die aktuelle Familie im FamilyService)
  SetupFamily(){
    this.setupFamilyAPIService.setupFamily(this.setupFamilyData).subscribe({
      next: (data) => {
        this.familyService.currentFamily = data; // Setze die aktuelle Familie im FamilyService
      },
      error: (e) => console.error(e), // Behandlung von Fehlern
    });
  }
}
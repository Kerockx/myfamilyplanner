import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { SetupPage} from './setup.page';
import { DefService } from '../../services/Def/def.service';
import { FamilyService } from '../../services/Family/family.service';
import { SetupFamilyAPIService } from '../../services/Family/setup-family-api.service';
import { UserService } from '../../services/User/user.service';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';

describe('SetupPage', () => {
  let component: SetupPage;
  let fixture: ComponentFixture<SetupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupPage],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: of({}) } }
        },
        { provide: DefService, useValue: { getAllDefFamilyMemberTypes: () => of([]), getAllDefActivityCategories: () => of([]), getAllDefMainActivities: () => of([]) } },
        { provide: FamilyService, useValue: {} },
        { provide: SetupFamilyAPIService, useValue: {} },
        { provide: UserService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty name', () => {
    expect(component.familyForm.get('txt_name')?.value).toEqual('');
  });

  it('should initialize family member counts', () => {
    expect(component.familyMemberCounts).toEqual([]);
    component.defFamilyMemberTypes = [{ ID: 1,txt_name:"Type 1" }, { ID: 2,txt_name:"Type 2" }];
    component.initializeFamilyMemberCounts();
    expect(component.familyMemberCounts).toEqual([{ ID: 1, count: 0 }, { ID: 2, count: 0 }]);
  });

  it('should add family member', () => {
    var type:DefFamilyMemberType = new DefFamilyMemberType();
    type.ID = 1;
    const count = component.GetFamilyMemberTypeCount(type);
    component.AddFamilyMember(type);
    expect(component.setupFamilyData.familyMemberData.length).toEqual(1);
    expect(component.GetFamilyMemberTypeCount(type)).toEqual(count + 1);
  });

  it('should remove family member', () => {
    var type:DefFamilyMemberType = new DefFamilyMemberType();
    type.ID = 1;
    const count = component.GetFamilyMemberTypeCount(type);
    component.AddFamilyMember(type);
    component.RemoveFamilyMember(type);
    expect(component.setupFamilyData.familyMemberData.length).toEqual(0);
    expect(component.GetFamilyMemberTypeCount(type)).toEqual(count);
  });

  it('should update family member count', () => {
    const typeID = 1;
    const delta = 1;
    const familyMemberCountIndex = component.familyMemberCounts.findIndex(member => member.ID === typeID);
    if (familyMemberCountIndex !== -1) {
      const initialCount = component.familyMemberCounts[familyMemberCountIndex].count;
      component.updateFamilyMemberCount(typeID, delta);
      expect(component.familyMemberCounts[familyMemberCountIndex].count).toEqual(initialCount + delta);
    } else {
      fail('Family member type ID not found.');
    }
  });

  it('should set setup state', () => {
    const value = 1;
    const initialSetupState = component.setupState;
    component.setSetupState(value);
    expect(component.setupState).toEqual(initialSetupState + value);
  });

  it('should call SetupFamily when setup state reaches last step', () => {
    spyOn(component, 'SetupFamily');
    component.setupState = component.lastSetupState - 1;
    component.setSetupState(1);
    expect(component.SetupFamily).toHaveBeenCalled();
  });
});
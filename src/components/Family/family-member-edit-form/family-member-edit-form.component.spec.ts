import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberEditFormComponent } from './family-member-edit-form.component';

describe('FamilyMemberEditFormComponent', () => {
  let component: FamilyMemberEditFormComponent;
  let fixture: ComponentFixture<FamilyMemberEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyMemberEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyMemberEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

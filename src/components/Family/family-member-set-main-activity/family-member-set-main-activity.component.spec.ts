import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberSetMainActivityComponent } from './family-member-set-main-activity.component';

describe('FamilyMemberSetMainActivityComponent', () => {
  let component: FamilyMemberSetMainActivityComponent;
  let fixture: ComponentFixture<FamilyMemberSetMainActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyMemberSetMainActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyMemberSetMainActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

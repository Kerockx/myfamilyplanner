import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDefListComponent } from './family-def-list.component';

describe('FamilyDefListComponent', () => {
  let component: FamilyDefListComponent;
  let fixture: ComponentFixture<FamilyDefListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyDefListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyDefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

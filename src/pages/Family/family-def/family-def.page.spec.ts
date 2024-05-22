import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDefPage } from './family-def.page';

describe('FamilyDefPage', () => {
  let component: FamilyDefPage;
  let fixture: ComponentFixture<FamilyDefPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyDefPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyDefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

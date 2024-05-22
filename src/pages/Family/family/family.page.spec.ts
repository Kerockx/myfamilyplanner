import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPage } from './family.page';

describe('FamilyPage', () => {
  let component: FamilyPage;
  let fixture: ComponentFixture<FamilyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

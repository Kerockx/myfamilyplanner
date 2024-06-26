import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCreateComponent } from './family-create.component';

describe('FamilyCreateComponent', () => {
  let component: FamilyCreateComponent;
  let fixture: ComponentFixture<FamilyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCheckboxSelectComponent } from './dynamic-checkbox-select.component';

describe('DynamicCheckboxSelectComponent', () => {
  let component: DynamicCheckboxSelectComponent;
  let fixture: ComponentFixture<DynamicCheckboxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicCheckboxSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicCheckboxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

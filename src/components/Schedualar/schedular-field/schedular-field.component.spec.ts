import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularFieldComponent } from './schedular-field.component';

describe('SchedularFieldComponent', () => {
  let component: SchedularFieldComponent;
  let fixture: ComponentFixture<SchedularFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedularFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedularFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

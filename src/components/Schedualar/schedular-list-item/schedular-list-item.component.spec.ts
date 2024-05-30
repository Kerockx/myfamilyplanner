import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularListItemComponent } from './schedular-list-item.component';

describe('SchedularListItemComponent', () => {
  let component: SchedularListItemComponent;
  let fixture: ComponentFixture<SchedularListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedularListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedularListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

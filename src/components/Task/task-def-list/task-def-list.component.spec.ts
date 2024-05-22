import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDefListComponent } from './task-def-list.component';

describe('TaskDefListComponent', () => {
  let component: TaskDefListComponent;
  let fixture: ComponentFixture<TaskDefListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDefListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

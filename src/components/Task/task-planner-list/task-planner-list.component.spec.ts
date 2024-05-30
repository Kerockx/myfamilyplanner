import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPlannerListComponent } from './task-planner-list.component';

describe('TaskPlannerListComponent', () => {
  let component: TaskPlannerListComponent;
  let fixture: ComponentFixture<TaskPlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPlannerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskPlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

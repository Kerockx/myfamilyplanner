import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDefPage } from './task-def.page';

describe('TaskDefPage', () => {
  let component: TaskDefPage;
  let fixture: ComponentFixture<TaskDefPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDefPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

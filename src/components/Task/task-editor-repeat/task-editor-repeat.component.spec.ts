import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditorRepeatComponent } from './task-editor-repeat.component';

describe('TaskEditorRepeatComponent', () => {
  let component: TaskEditorRepeatComponent;
  let fixture: ComponentFixture<TaskEditorRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditorRepeatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskEditorRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDefEditorComponent } from './task-def-editor.component';

describe('TaskDefEditorComponent', () => {
  let component: TaskDefEditorComponent;
  let fixture: ComponentFixture<TaskDefEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDefEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDefEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

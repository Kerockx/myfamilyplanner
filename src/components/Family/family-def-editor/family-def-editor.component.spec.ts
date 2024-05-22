import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDefEditorComponent } from './family-def-editor.component';

describe('FamilyDefEditorComponent', () => {
  let component: FamilyDefEditorComponent;
  let fixture: ComponentFixture<FamilyDefEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyDefEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyDefEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyEditorComponent } from './family-editor.component';

describe('FamilyEditorComponent', () => {
  let component: FamilyEditorComponent;
  let fixture: ComponentFixture<FamilyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

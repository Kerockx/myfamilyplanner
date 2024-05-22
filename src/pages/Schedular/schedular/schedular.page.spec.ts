import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularPage } from './schedular.page';

describe('SchedularPage', () => {
  let component: SchedularPage;
  let fixture: ComponentFixture<SchedularPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedularPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

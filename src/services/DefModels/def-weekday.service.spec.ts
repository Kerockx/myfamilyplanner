import { TestBed } from '@angular/core/testing';

import { DefWeekdayService } from './def-weekday.service';

describe('DefWeekdaysService', () => {
  let service: DefWeekdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefWeekdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

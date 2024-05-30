import { TestBed } from '@angular/core/testing';

import { DefAPIService } from './def-api.service';

describe('DefAPIService', () => {
  let service: DefAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

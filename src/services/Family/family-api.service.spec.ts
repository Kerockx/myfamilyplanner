import { TestBed } from '@angular/core/testing';

import { FamilyAPIService } from './family-api.service';

describe('FamilyAPIService', () => {
  let service: FamilyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

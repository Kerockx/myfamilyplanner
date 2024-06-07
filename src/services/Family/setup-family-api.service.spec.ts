import { TestBed } from '@angular/core/testing';

import { SetupFamilyAPIService } from './setup-family-api.service';

describe('SetupFamilyAPIService', () => {
  let service: SetupFamilyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupFamilyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

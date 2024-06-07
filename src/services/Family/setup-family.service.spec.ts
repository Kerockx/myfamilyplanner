import { TestBed } from '@angular/core/testing';

import { SetupFamilyService } from './setup-family.service';

describe('SetupFamilyService', () => {
  let service: SetupFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

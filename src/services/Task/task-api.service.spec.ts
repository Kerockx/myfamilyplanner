import { TestBed } from '@angular/core/testing';

import { TaskAPIService } from './task-api.service';

describe('TaskAPIService', () => {
  let service: TaskAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IsLoggedService } from './get-role.service';

describe('IsLoggedService', () => {
  let service: IsLoggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

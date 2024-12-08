import { TestBed } from '@angular/core/testing';

import { PassQueryParamsService } from './pass-query-params.service';

describe('PassQueryParamsService', () => {
  let service: PassQueryParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassQueryParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

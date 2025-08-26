import { TestBed } from '@angular/core/testing';

import { LoadSpinner } from './load-spinner';

describe('LoadSpinner', () => {
  let service: LoadSpinner;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSpinner);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ActivatedGuard } from './activated.guard';

describe('ActivatedGuard', () => {
  let guard: ActivatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TrialGuard } from './trial.guard';

describe('TrialGuard', () => {
  let guard: TrialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

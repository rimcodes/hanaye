import { TestBed } from '@angular/core/testing';

import { MapPolylinesService } from './map-polylines.service';

describe('MapPolylinesService', () => {
  let service: MapPolylinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPolylinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

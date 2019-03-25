import { TestBed } from '@angular/core/testing';

import { AdMockService } from './ad-mock.service';

describe('AdMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdMockService = TestBed.get(AdMockService);
    expect(service).toBeTruthy();
  });
});

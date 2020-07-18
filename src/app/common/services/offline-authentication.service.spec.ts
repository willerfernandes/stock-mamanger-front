import { TestBed } from '@angular/core/testing';

import { OfflineAuthenticationService } from './offline-authentication.service';

describe('OfflineAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineAuthenticationService = TestBed.get(OfflineAuthenticationService);
    expect(service).toBeTruthy();
  });
});

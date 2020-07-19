import { TestBed } from '@angular/core/testing';

import { OnlineAuthenticationService } from './online-authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineAuthenticationService = TestBed.get(OnlineAuthenticationService);
    expect(service).toBeTruthy();
  });
});

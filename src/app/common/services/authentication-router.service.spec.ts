import { TestBed } from '@angular/core/testing';

import { AuthenticationRouterService } from './authentication-router.service';

describe('AuthorizationRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationRouterService = TestBed.get(AuthenticationRouterService);
    expect(service).toBeTruthy();
  });
});

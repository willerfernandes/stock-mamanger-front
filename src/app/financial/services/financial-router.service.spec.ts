import { TestBed } from '@angular/core/testing';

import { FinancialRouterService } from './financial-router.service';

describe('FinancialRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinancialRouterService = TestBed.get(FinancialRouterService);
    expect(service).toBeTruthy();
  });
});

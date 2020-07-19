import { TestBed } from '@angular/core/testing';

import { OfflineFinancialService } from './offline-financial.service';

describe('OfflineFinancialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineFinancialService = TestBed.get(OfflineFinancialService);
    expect(service).toBeTruthy();
  });
});

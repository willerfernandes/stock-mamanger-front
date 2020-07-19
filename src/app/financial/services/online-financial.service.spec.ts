import { TestBed } from '@angular/core/testing';

import { OnlineFinancialService } from './online-financial.service';

describe('OnlineFinancialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineFinancialService = TestBed.get(OnlineFinancialService);
    expect(service).toBeTruthy();
  });
});

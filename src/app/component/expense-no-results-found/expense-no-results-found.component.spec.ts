import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseNoResultsFoundComponent } from './expense-no-results-found.component';

describe('ExpenseNoResultsFoundComponent', () => {
  let component: ExpenseNoResultsFoundComponent;
  let fixture: ComponentFixture<ExpenseNoResultsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseNoResultsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseNoResultsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

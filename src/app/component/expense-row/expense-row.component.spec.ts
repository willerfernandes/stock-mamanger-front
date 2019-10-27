import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRowComponent } from './expense-row.component';

describe('ExpenseRowComponent', () => {
  let component: ExpenseRowComponent;
  let fixture: ComponentFixture<ExpenseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

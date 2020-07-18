import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseErrorScreenComponent } from './expense-error-screen.component';

describe('ExpenseErrorScreenComponent', () => {
  let component: ExpenseErrorScreenComponent;
  let fixture: ComponentFixture<ExpenseErrorScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseErrorScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseErrorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

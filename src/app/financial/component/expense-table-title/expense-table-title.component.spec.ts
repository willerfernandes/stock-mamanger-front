import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTableTitleComponent } from './expense-table-title.component';

describe('ExpenseTableTitleComponent', () => {
  let component: ExpenseTableTitleComponent;
  let fixture: ComponentFixture<ExpenseTableTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTableTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTableTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

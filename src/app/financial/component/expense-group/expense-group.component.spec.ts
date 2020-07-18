import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseGroupComponent } from './expense-group.component';

describe('ExpenseGroupComponent', () => {
  let component: ExpenseGroupComponent;
  let fixture: ComponentFixture<ExpenseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

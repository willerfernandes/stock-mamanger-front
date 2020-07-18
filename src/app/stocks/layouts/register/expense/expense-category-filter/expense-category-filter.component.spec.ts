import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryFilterComponent } from './expense-category-filter.component';

describe('ExpenseCategoryFilterComponent', () => {
  let component: ExpenseCategoryFilterComponent;
  let fixture: ComponentFixture<ExpenseCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

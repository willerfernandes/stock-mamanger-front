import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseBottomSheetComponent } from './expense-bottom-sheet.component';

describe('ExpenseBottomSheetComponent', () => {
  let component: ExpenseBottomSheetComponent;
  let fixture: ComponentFixture<ExpenseBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

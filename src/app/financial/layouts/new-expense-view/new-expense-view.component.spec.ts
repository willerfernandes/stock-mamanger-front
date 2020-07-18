import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenseViewComponent } from './new-expense-view.component';

describe('NewExpenseViewComponent', () => {
  let component: NewExpenseViewComponent;
  let fixture: ComponentFixture<NewExpenseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpenseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

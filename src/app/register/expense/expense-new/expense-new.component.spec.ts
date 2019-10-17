import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseNewComponent } from './expense-new.component';

describe('ExpenseNewComponent', () => {
  let component: ExpenseNewComponent;
  let fixture: ComponentFixture<ExpenseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

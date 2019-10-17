import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryNewComponent } from './expense-category-new.component';

describe('ExpenseCategoryNewComponent', () => {
  let component: ExpenseCategoryNewComponent;
  let fixture: ComponentFixture<ExpenseCategoryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

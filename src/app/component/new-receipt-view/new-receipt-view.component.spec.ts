import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReceiptViewComponent } from './new-receipt-view.component';

describe('NewReceiptViewComponent', () => {
  let component: NewReceiptViewComponent;
  let fixture: ComponentFixture<NewReceiptViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReceiptViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReceiptViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

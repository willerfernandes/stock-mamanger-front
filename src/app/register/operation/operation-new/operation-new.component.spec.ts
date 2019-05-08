import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationNewComponent } from './operation-new.component';

describe('OperationNewComponent', () => {
  let component: OperationNewComponent;
  let fixture: ComponentFixture<OperationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPrimaryBlueComponent } from './btn-primary-blue.component';

describe('BtnPrimaryBlueComponent', () => {
  let component: BtnPrimaryBlueComponent;
  let fixture: ComponentFixture<BtnPrimaryBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnPrimaryBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPrimaryBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

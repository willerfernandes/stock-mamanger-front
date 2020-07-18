import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPrimaryBlueLargeComponent } from './btn-primary-blue-large.component';

describe('BtnPrimaryBlueLargeComponent', () => {
  let component: BtnPrimaryBlueLargeComponent;
  let fixture: ComponentFixture<BtnPrimaryBlueLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnPrimaryBlueLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPrimaryBlueLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

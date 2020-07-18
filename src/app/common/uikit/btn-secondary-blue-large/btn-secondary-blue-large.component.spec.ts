import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSecondaryBlueLargeComponent } from './btn-secondary-blue-large.component';

describe('BtnSecondaryBlueLargeComponent', () => {
  let component: BtnSecondaryBlueLargeComponent;
  let fixture: ComponentFixture<BtnSecondaryBlueLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSecondaryBlueLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSecondaryBlueLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

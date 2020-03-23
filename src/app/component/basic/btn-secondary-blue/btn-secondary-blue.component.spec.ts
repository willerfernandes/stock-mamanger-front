import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSecondaryBlueComponent } from './btn-secondary-blue.component';

describe('BtnSecondaryBlueComponent', () => {
  let component: BtnSecondaryBlueComponent;
  let fixture: ComponentFixture<BtnSecondaryBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSecondaryBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSecondaryBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

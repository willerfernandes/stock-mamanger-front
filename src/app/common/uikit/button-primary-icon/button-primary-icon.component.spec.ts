import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryIconComponent } from './button-primary-icon.component';

describe('ButtonPrimaryIconComponent', () => {
  let component: ButtonPrimaryIconComponent;
  let fixture: ComponentFixture<ButtonPrimaryIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonPrimaryIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPrimaryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

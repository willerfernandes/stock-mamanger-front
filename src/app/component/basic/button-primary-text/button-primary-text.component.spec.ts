import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryTextComponent } from './button-primary-text.component';

describe('ButtonPrimaryTextComponent', () => {
  let component: ButtonPrimaryTextComponent;
  let fixture: ComponentFixture<ButtonPrimaryTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonPrimaryTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPrimaryTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

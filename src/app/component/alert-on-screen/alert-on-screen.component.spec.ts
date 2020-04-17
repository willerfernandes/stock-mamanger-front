import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertOnScreenComponent } from './alert-on-screen.component';

describe('AlertOnScreenComponent', () => {
  let component: AlertOnScreenComponent;
  let fixture: ComponentFixture<AlertOnScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertOnScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertOnScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

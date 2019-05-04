import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNewComponent } from './config-new.component';

describe('ConfigNewComponent', () => {
  let component: ConfigNewComponent;
  let fixture: ComponentFixture<ConfigNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

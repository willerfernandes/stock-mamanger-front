import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmViewComponent } from './adm-view.component';

describe('AdmViewComponent', () => {
  let component: AdmViewComponent;
  let fixture: ComponentFixture<AdmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

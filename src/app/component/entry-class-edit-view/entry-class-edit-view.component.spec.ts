import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryClassEditViewComponent } from './entry-class-edit-view.component';

describe('EntryClassEditViewComponent', () => {
  let component: EntryClassEditViewComponent;
  let fixture: ComponentFixture<EntryClassEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryClassEditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryClassEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

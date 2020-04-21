import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryClassListViewComponent } from './entry-class-list-view.component';

describe('EntryClassListViewComponent', () => {
  let component: EntryClassListViewComponent;
  let fixture: ComponentFixture<EntryClassListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryClassListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryClassListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

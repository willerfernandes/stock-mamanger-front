import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListViewComponent } from './entry-list-view.component';

describe('EntryListViewComponent', () => {
  let component: EntryListViewComponent;
  let fixture: ComponentFixture<EntryListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

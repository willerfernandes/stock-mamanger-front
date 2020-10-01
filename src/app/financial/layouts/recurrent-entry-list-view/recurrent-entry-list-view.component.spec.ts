import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentEntryListViewComponent } from './recurrent-entry-list-view.component';

describe('RecurrentEntryListViewComponent', () => {
  let component: RecurrentEntryListViewComponent;
  let fixture: ComponentFixture<RecurrentEntryListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentEntryListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentEntryListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

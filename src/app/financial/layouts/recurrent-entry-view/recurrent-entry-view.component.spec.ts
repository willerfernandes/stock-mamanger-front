import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentEntryViewComponent } from './recurrent-entry-view.component';

describe('RecurrentEntryViewComponent', () => {
  let component: RecurrentEntryViewComponent;
  let fixture: ComponentFixture<RecurrentEntryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentEntryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

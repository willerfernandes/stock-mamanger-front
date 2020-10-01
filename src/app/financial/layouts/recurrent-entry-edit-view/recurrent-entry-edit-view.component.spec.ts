import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentEntryEditViewComponent } from './recurrent-entry-edit-view.component';

describe('RecurrentEntryEditViewComponent', () => {
  let component: RecurrentEntryEditViewComponent;
  let fixture: ComponentFixture<RecurrentEntryEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentEntryEditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentEntryEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

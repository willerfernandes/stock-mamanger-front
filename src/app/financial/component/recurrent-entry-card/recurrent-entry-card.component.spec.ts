import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentEntryCardComponent } from './recurrent-entry-card.component';

describe('RecurrentEntryCardComponent', () => {
  let component: RecurrentEntryCardComponent;
  let fixture: ComponentFixture<RecurrentEntryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentEntryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentEntryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

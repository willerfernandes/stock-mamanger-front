import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFilterComponent } from './stock-filter.component';

describe('StockFilterComponent', () => {
  let component: StockFilterComponent;
  let fixture: ComponentFixture<StockFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

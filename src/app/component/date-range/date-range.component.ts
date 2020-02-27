import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {


  @Input()
  public startDate: string;

  @Input()
  public endDate: string;

  @Output()
  public reloadButtonClicked = new EventEmitter();

  onReloadButtonClicked(event: any) {
    this.reloadButtonClicked.emit(event);
  }

  constructor() { }

  ngOnInit() {
  }

}

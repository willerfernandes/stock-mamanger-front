import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

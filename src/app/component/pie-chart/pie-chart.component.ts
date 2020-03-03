import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  public pieChartType = 'pie';

  @Input()
  public pieChartTitle: string;

  @Input()
  public pieChartLabels: string[];

  @Input()
  public pieChartData: number[];

  public pieChartColors: Array < any > = [{
    backgroundColor: ['#d4bbfc', '#bbbdfc', '#fcbbbb', '#fcf3bb', '#bbfcbc', '#fcd7bb'],
    borderColor: ['white']
 }];


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
  }

}

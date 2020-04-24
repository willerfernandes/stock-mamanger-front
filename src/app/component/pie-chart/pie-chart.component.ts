import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  public pieChartType = 'pie';

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  @Input()
  public pieChartTitle: string;
  @Input()
  public pieChartLabels: string[];
  @Input()
  public pieChartData: number[];

  pieChartLegend = true;

  public pieChartColors: Array < any > = [{
    backgroundColor: ['#d4bbfc', '#bbbdfc', '#fcbbbb', '#fcf3bb', '#bbfcbc', '#fcd7bb'],
    //backgroundColor: ['#9452ff', '#6352ff', '#52a0ff', '#fcf3bb', '#bbfcbc', '#fcd7bb'],

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

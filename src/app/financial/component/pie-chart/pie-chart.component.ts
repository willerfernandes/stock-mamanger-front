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

   title : {
      text: 'Browser market shares at a specific website, 2014'
   },
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

  @Input()
  public pieChartInputColors: string[];

  pieChartLegend = true;
  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnInit() {
  }

}

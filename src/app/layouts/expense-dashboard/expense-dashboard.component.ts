import { Component, OnInit } from '@angular/core';
import {ExpenseService} from './../../services/expense.service';
@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {

// Pie
  public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
  public pieChartData:number[] = [40, 20, 20 , 10,10];
  public pieChartType:string = 'pie';

  gruposLancamentos;
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  get_expenses_resume(){
	  this.ExpenseService.get().subscribe(res => {
	  		console.log(res);
	        this.pieChartLabels = res.itemGrafico.nome;
	        this.pieChartData = res.itemGrafico.valor;
	        this.gruposLancamentos = res.gruposLancamentos;        
	  });
  }

  constructor(private ExpenseService: ExpenseService) { }

  ngOnInit() {
  	this.get_expenses_resume();
  }

}

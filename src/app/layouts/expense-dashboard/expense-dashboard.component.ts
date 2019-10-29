import { Component, OnInit } from '@angular/core';
import {ExpenseService} from './../../services/expense.service';
import {DateAdapter} from '@angular/material/core';

import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {

// Pie
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  public pieChartTitle = 'Despesas';

  public dataInicial;
  public dataFinal;

  gruposLancamentos;
  tableTitle = 'RESUMO DESPESAS';

  public isSuccess = true;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  get_expenses_resume(dataInicial: string, dataFinal: string) {
    this.expenseService.get(dataInicial, dataFinal).subscribe(res => {
    console.log(res);
    this.pieChartLabels = res.itemGrafico.nome;
    this.pieChartData = res.itemGrafico.valor;
    this.gruposLancamentos = res.gruposLancamentos;
    this.isSuccess = res.itemGrafico !== null;
    }).orElse(this.isSuccess = false);
  }

  constructor(private expenseService: ExpenseService, private apapter: DateAdapter<any>) { }

  ngOnInit() {
    this.apapter.setLocale('br');
    const dataInicial = new Date();
    dataInicial.setMonth(dataInicial.getMonth() - 1);
    this.dataInicial = new FormControl(dataInicial);
    this.dataFinal = new FormControl(new Date(Date.now()));
    this.get_expenses_resume(this.dataInicial.value.toISOString(), this.dataFinal.value.toISOString());
  }

  /*openModal(id: string) {
    this.modalService.open(id);
}*/

}

import { Component, OnInit } from '@angular/core';
import {ExpenseService} from './../../services/expense.service';
import {DateAdapter} from '@angular/material/core';

import { FormControl } from '@angular/forms';
import { FakeService } from 'src/app/services/fake.service';
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


  get_expenses_resume(startDate: any, endDate: any) {
    console.log('Get Expense Resume!');
    this.expenseService.loadExpenseReport(startDate.toISOString(), endDate.toISOString()).subscribe(res => {
    console.log(res);
    if (res) {
      this.pieChartLabels = res.itemGrafico.nome;
      this.pieChartData = res.itemGrafico.valor;
      this.gruposLancamentos = res.gruposLancamentos;
      this.isSuccess = res.itemGrafico !== null;
    } else {
      this.pieChartLabels = null;
      this.pieChartData = null;
      this.gruposLancamentos = null;
      this.isSuccess = false;
      console.log('No content -> Fill with empty wallet image!');
    }
    });
  }

  constructor(private expenseService: ExpenseService, private fakeService: FakeService, private apapter: DateAdapter<any>) { }

  ngOnInit() {
    this.apapter.setLocale('br');
    const dataInicial = new Date();
    dataInicial.setMonth(dataInicial.getMonth() - 1);
    this.dataInicial = new FormControl(dataInicial);
    this.dataFinal = new FormControl(new Date(Date.now()));
    this.get_expenses_resume(this.dataInicial.value, this.dataFinal.value);
  }

  /*openModal(id: string) {
    this.modalService.open(id);
}*/

}

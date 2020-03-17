import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './../../services/expense.service';
import { DateAdapter } from '@angular/material/core';

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
  public pieChartTitle = '';

  public startDate: any;
  public endDate: any;

  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
  'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  /*, "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];*/


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


  setCurrentTile() {
    const startDate: Date = new Date(this.startDate.value.toISOString());
    const endDate: Date = new Date(this.endDate.value.toISOString());
    if (startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()) {
      const consideredStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const consideredEndDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      this.pieChartTitle = this.monthNames[startDate.getMonth()];
      if (startDate === consideredStartDate && endDate === consideredEndDate) {
        console.log('Mesma data');
        //this.setCurrentTile = this.monthNames[startDate.getMonth()];
      }
    } else {
      this.pieChartTitle = 'Personalizado';
    }

  }


  get_expenses_resume(startDate: any, endDate: any) {
    this.setCurrentTile();
    console.log('Get Expense Resume!');
    this.fakeService.loadExpenseReport(startDate.toISOString(), endDate.toISOString()).subscribe(res => {
      console.log(res);
      if (res) {
        this.pieChartLabels = res.itemGrafico.nome;
        this.pieChartData = res.itemGrafico.valor;
        this.gruposLancamentos = res.gruposLancamentos;
        this.isSuccess = res.itemGrafico !== null;
      } else {
        this.isSuccess = false;
        console.log('No content -> Fill with empty wallet image!');
      }
    });
  }

  constructor(private expenseService: ExpenseService, private fakeService: FakeService, private apapter: DateAdapter<any>) { }

  ngOnInit() {
    this.apapter.setLocale('br');
    let dataInicial = new Date(Date.now());
    dataInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), 1);

    let dataFinal = new Date(Date.now());
    dataFinal = new Date(dataFinal.getFullYear(), dataFinal.getMonth() + 1, 0);

    this.startDate = new FormControl(dataInicial);
    this.endDate = new FormControl(dataFinal);
    this.get_expenses_resume(this.startDate.value, this.endDate.value);
  }




}

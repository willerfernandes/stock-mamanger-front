import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExpenseService } from './../../services/expense.service';
import { DateAdapter } from '@angular/material/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

import { FormControl } from '@angular/forms';
import { FakeService } from 'src/app/services/fake.service';
import { GrupoLancamento } from 'src/app/entities/grupo-lancamento';
import { ExpenseReport } from 'src/app/entities/expense-report';
import { NewExpenseViewComponent } from '../new-expense-view/new-expense-view.component';
@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {


  /// $$$$$ REFACTOR TO USE RES ON SINGLE VARIABLE OF TYPE EXPENSE REPORT $$$$$ ///

  // Pie
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  public pieChartTitle = '';

  // Dates
  public startDate: any;
  public endDate: any;


  public gruposLancamentos: GrupoLancamento[];
  public tableTitle = 'RESUMO DESPESAS';
  public isSuccess = true;


  public expenseReport: ExpenseReport;
  public totalReceipt = 0;


  public isAddMenuActive: boolean;

  public expenseClicked = false;

  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
  'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  constructor(private ref: ChangeDetectorRef,
              private expenseService: ExpenseService,
              private fakeService: FakeService,
              private apapter: DateAdapter<any>,
              private bottomSheet: MatBottomSheet) { }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  public activeExpense(): void {
    this.expenseClicked = true;
    console.log('expenseClicked');
    document.getElementById('mainDiv').style.opacity = '1.0';
    document.getElementById('mainDiv').style.pointerEvents = 'auto';
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(NewExpenseViewComponent);
  }

  public inactivateMenu(): void {
    console.log('inactivated');
    this.isAddMenuActive = false;
  }

  public onButtonAddClick(): void {
    this.isAddMenuActive = true;
  }

  public onMenuDismissed(): void {
    console.log('Returning Opacity!');
    document.getElementById('mainDiv').style.opacity = '1.0';
    this.isAddMenuActive = false;
    console.log('Menu Dismissed!');
    this.ref.detectChanges();
  }

  returnNornalOpacity() {
      console.log('Returning Opacity!');
      document.getElementById('mainDiv').style.opacity = '1.0';
      document.getElementById('mainDiv').style.pointerEvents = 'auto';
  }

  setOpacity() {
    console.log('Setting Opacity!');
    document.getElementById('mainDiv').style.opacity = '0.1';
    document.getElementById('mainDiv').style.pointerEvents = 'none';
  }

  public getFinancialStatement(): number {
    return this.expenseReport.valorTotal - this.totalReceipt;
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
        this.expenseReport = res;
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

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExpenseService } from './../../services/expense.service';
import { DateAdapter } from '@angular/material/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { FormControl } from '@angular/forms';
import { FakeService } from 'src/app/services/fake.service';
import { GrupoLancamento } from 'src/app/entities/grupo-lancamento';
import { ExpenseReport } from 'src/app/entities/expense-report';
import { NewExpenseViewComponent } from '../new-expense-view/new-expense-view.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NewReceiptViewComponent } from 'src/app/component/new-receipt-view/new-receipt-view.component';
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


  public gruposLancamentosDespesas: GrupoLancamento[];
  public gruposLancamentosReceitas: GrupoLancamento[];
  public tableTitle = 'RESUMO DESPESAS';

  public isSuccess = false;
  public isEmptyResult = false;
  public isLoading = false;

  public totalReceipt = 0;
  public totalExpenses = 0;

  public isAddMenuActive: boolean;

  public expenseClicked = false;
  public isFakeServer = false;

  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
    'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  constructor(private authService: AuthenticationService,
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

  public clickArrowPrevious(): void {
    this.getExpenseReportAddMonth(-1);
  }

  public clickArrowNext(): void {
    this.getExpenseReportAddMonth(1);
  }

  private getExpenseReportAddMonth(addMonths: number) {
    const startDate: Date = new Date(this.startDate.value.toISOString());
    startDate.setMonth(startDate.getMonth() + addMonths);
    startDate.setDate(1);
    const newEndDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    this.startDate = new FormControl(startDate);
    this.endDate = new FormControl(newEndDate);
    this.get_expenses_resume(this.startDate.value, this.endDate.value);
  }

  public entryDeleted(): void {
    this.authService.openDialog('Lançamento excluido com sucesso', 2000);
    this.ngOnInit();
  }

  public activeExpense(): void {
    this.expenseClicked = true;
    document.getElementById('mainDiv').style.opacity = '1.0';
    document.getElementById('mainDiv').style.pointerEvents = 'auto';
    this.openBottomSheetExpense();
  }

  public activeReceipt(): void {
    this.expenseClicked = true;
    document.getElementById('mainDiv').style.opacity = '1.0';
    document.getElementById('mainDiv').style.pointerEvents = 'auto';
    this.openBottomSheetReceipt();
  }

  openBottomSheetExpense(): void {
    const bottomSheet = this.bottomSheet.open(NewExpenseViewComponent);
    bottomSheet.instance.entrySaved.subscribe(() => {
      this.ngOnInit();
    });
  }

  openBottomSheetReceipt(): void {
    const bottomSheet = this.bottomSheet.open(NewReceiptViewComponent);
    bottomSheet.instance.entrySaved.subscribe(() => {
      this.ngOnInit();
    });
  }

  public inactivateMenu(): void {
    this.isAddMenuActive = false;
  }

  public onButtonAddClick(): void {
    this.isAddMenuActive = true;
  }

  public onMenuDismissed(): void {
    document.getElementById('mainDiv').style.opacity = '1.0';
    this.isAddMenuActive = false;
  }

  returnNornalOpacity() {
    document.getElementById('mainDiv').style.opacity = '1.0';
    document.getElementById('mainDiv').style.pointerEvents = 'auto';
  }

  setOpacity() {
    document.getElementById('mainDiv').style.opacity = '0.1';
    document.getElementById('mainDiv').style.pointerEvents = 'none';
  }

  public getFinancialStatement(): number {
    return this.totalReceipt - this.totalExpenses;
  }

  setCurrentTile() {
    const startDate: Date = new Date(this.startDate.value.toISOString());
    const endDate: Date = new Date(this.endDate.value.toISOString());
    if (startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()) {
      const consideredStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const consideredEndDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      //this.pieChartTitle = this.monthNames[startDate.getMonth()];
      if (startDate.getTime() === consideredStartDate.getTime()
        && endDate.getTime() === consideredEndDate.getTime()) {
        this.pieChartTitle = this.monthNames[startDate.getMonth()];
      } else {
        this.pieChartTitle = 'Personalizado';
      }
    } else {
      this.pieChartTitle = 'Personalizado';
    }

  }

  get_expenses_resume(startDate: any, endDate: any) {
    this.setCurrentTile();
    this.isLoading = true;
    console.log('isLoading=true');
    this.fakeService.loadExpenseReport(startDate.toISOString(), endDate.toISOString())
      .subscribe(async res => {
        if (res) {
          console.log(res);
          this.totalExpenses = res.valorTotalDespesas;
          this.totalReceipt = res.valorTotalReceitas;
          this.pieChartLabels = res.itemGrafico.nome;
          this.pieChartData = res.itemGrafico.valor;
          this.gruposLancamentosDespesas = res.gruposLancamentosDespesas;
          this.gruposLancamentosReceitas = res.gruposLancamentosReceitas;
          this.isSuccess = true;
          this.isEmptyResult = false;
          this.isLoading = false;
        } else {
          this.isSuccess = true;
          this.isEmptyResult = true;
          this.isLoading = false;
        }
      },
        err => {
          this.isSuccess = false;
          this.isEmptyResult = true;
          this.isLoading = false;
        });
  }


  ngOnInit() {
    this.isFakeServer = this.fakeService.isFakeServer;
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

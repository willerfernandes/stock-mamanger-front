import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { FormControl, FormGroup } from '@angular/forms';
import { NewExpenseViewComponent } from '../new-expense-view/new-expense-view.component';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/common/services/message.service';
import { EntryGroup } from '../../entities/entry-group';
import { Entry } from '../../entities/entry';
import { NewReceiptViewComponent } from '../new-receipt-view/new-receipt-view.component';
import { FinancialService } from '../../services/financial.service';
import { RecurrentEntry } from '../../entities/recurrent-entry';
import { RecurrentEntryGroup } from '../../entities/recurrent-entry-group';

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {

  /// $$$$$ REFACTOR TO USE RES ON SINGLE VARIABLE OF TYPE EXPENSE REPORT $$$$$ ///


  private NUMBER_OF_ELEMENTS_TO_SHOW_ON_LAST_ENTRIES = 5;

  // Pie
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  public pieChartTitle = '';

  // Dates
  public startDate: any;
  public endDate: any;


  public expenseGroups: EntryGroup[] = [];
  public receiptGroups: EntryGroup[] = [];
  public recurrentEntryGroups: RecurrentEntryGroup[] = [];

  public tableTitle = 'RESUMO DESPESAS';

  public isSuccess = false;
  public isEmptyResult = false;
  public isLoading = false;

  public totalReceipt = 0;
  public totalExpenses = 0;

  public isAddMenuActive: boolean;

  public expenseClicked = false;
  public isOfflineMode = false;

  public allEntries: Entry[] = [];

  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
    'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  constructor(private financialService: FinancialService,
              private apapter: DateAdapter<any>,
              private bottomSheet: MatBottomSheet,
              private router: Router,
              private messageService: MessageService) { }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
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
    this.getExpenseReport(this.startDate.value, this.endDate.value);
  }

  public entryDeleted(): void {
    this.messageService.openMessageBar('Lançamento excluido com sucesso', 2000);
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

  public onShowMoreClicked(): void {
    this.router.navigate(['/entries']);
  }

  setCurrentTile() {
    const startDate: Date = new Date(this.startDate.value.toISOString());
    const endDate: Date = new Date(this.endDate.value.toISOString());
    if (startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()) {
      const consideredStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const consideredEndDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
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


  public createEntryForRecurrent(recurrentEntry: RecurrentEntry) {
    sessionStorage.setItem('recurrentEntry', JSON.stringify(recurrentEntry));
    const bottomSheet = this.bottomSheet.open(NewExpenseViewComponent);
    bottomSheet.instance.entrySaved.subscribe(() => {
      this.ngOnInit();
    });
  }

  public getExpenseReport(startDate: any, endDate: any): void {
    this.setCurrentTile();
    this.isLoading = true;
    this.financialService.loadExpenseReport(startDate.toISOString(), endDate.toISOString())
      .subscribe(async res => {
        if (res) {
          this.totalExpenses = res.totalExpenseAmount;
          this.totalReceipt = res.totalReceiptAmount;
          this.pieChartLabels = res.graphInfo.itens;
          this.pieChartData = res.graphInfo.values;
          this.expenseGroups = res.expenseGroups;
          this.receiptGroups = res.receiptGroups;
          this.recurrentEntryGroups = res.recurrentEntryGroups;

          this.expenseGroups.sort((a, b) => {
            if (a.value < b.value) {
              return 1;
            } else if (a.value > b.value) {
              return -1;
            } else {
              return 0;
            }
          });

          this.receiptGroups.sort((a, b) => {
            if (a.value < b.value) {
              return 1;
            } else if (a.value > b.value) {
              return -1;
            } else {
              return 0;
            }
          });

          this.allEntries = this.getEntries(res.expenseGroups.concat(res.receiptGroups));
          this.isSuccess = true;
          this.isEmptyResult = this.expenseGroups.length === 0 && this.receiptGroups.length === 0;
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

  private getEntries(entryGroups: EntryGroup[]): Entry[] {
    let entries: Entry[] = [];
    entryGroups.forEach(group => {
      entries = entries.concat(group.entries);
    });

    // sort reversed
    entries.sort( (a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else if (new Date(a.date) > new Date(b.date)) {
        return -1;
      } else {
        return 0;
      }
    });

    return entries.slice(0, this.NUMBER_OF_ELEMENTS_TO_SHOW_ON_LAST_ENTRIES);
  }

  ngOnInit() {
    this.isOfflineMode = !this.financialService.isOnline;
    this.apapter.setLocale('br');
    let dataInicial = new Date(Date.now());
    dataInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), 1);

    let dataFinal = new Date(Date.now());
    dataFinal = new Date(dataFinal.getFullYear(), dataFinal.getMonth() + 1, 0);

    this.startDate = new FormControl(dataInicial);
    this.endDate = new FormControl(dataFinal);
    this.getExpenseReport(this.startDate.value, this.endDate.value);
  }
}

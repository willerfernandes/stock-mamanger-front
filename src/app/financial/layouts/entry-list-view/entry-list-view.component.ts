import { Component, OnInit } from '@angular/core';

import { DateAdapter } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { Entry } from '../../entities/entry';
import { EntryGroup } from '../../entities/entry-group';
import { ExpenseReport } from '../../entities/expense-report';
import { FinancialService } from '../../services/financial.service';


@Component({
  selector: 'app-entry-list-view',
  templateUrl: './entry-list-view.component.html',
  styleUrls: ['./entry-list-view.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('2s')
      ]),
    ]),
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ],
})
export class EntryListViewComponent implements OnInit {


  // Dates
  public startDate: any;
  public endDate: any;

  // Exception Controll
  public isSuccess = false;
  public isEmptyResult = false;
  public isLoading = false;

  public allEntries: Entry[] = [];
  public filteredEntries: Entry[] = [];

  public isFirtsFilterSelected = false;
  public isSecondFilterSelected = false;
  public isThirdFilterSelected = false;
  public isOtherFilterSelected = false;

  public filterSelected = 0;

  constructor(private financialService: FinancialService,
              private apapter: DateAdapter<any>,
              private router: Router) { }

  ngOnInit() {
    this.apapter.setLocale('br');
    let dataInicial = new Date(Date.now());
    dataInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), 1);

    let dataFinal = new Date(Date.now());
    dataFinal = new Date(dataFinal.getFullYear(), dataFinal.getMonth() + 1, 0);

    this.startDate = new FormControl(dataInicial);
    this.endDate = new FormControl(dataFinal);
    this.getExpenseReport2(this.startDate.value, this.endDate.value);
    this.filteredEntries = this.allEntries;
    this.isFirtsFilterSelected = true;
  }

  public firstFilter(): void {
    this.filterSelected = 1;
    this.ngOnInit();

  }

  public secondFilter(): void {
    this.filterSelected = 2;


    const today = new Date().getDate();
    this.filteredEntries = this.allEntries.filter(entry => new Date(entry.date).getDate() >= today - 7);
    this.isEmptyResult = this.filteredEntries.length < 0;
  }

  public thirdFilter(): void {
    this.filterSelected = 3;
    this.isLoading = true;

    const today = new Date().getDate();
    this.filteredEntries = this.allEntries.filter(entry => new Date(entry.date).getDate() >= today - 15);
    this.isEmptyResult = this.filteredEntries.length < 0;
    this.isLoading = false;
  }

  public otherFilter(): void {
    this.filterSelected = 4;
  }

  public filterByDate(startDate: any, endDate: any): void {
    /*const initialFilterDate = new Date(startDate.toISOString());
    const endFilterDate = new Date(endDate.toISOString());
    const today = new Date();
    this.filteredEntries = this.allEntries.filter(entry => today > initialFilterDate && today < endFilterDate);
    */
    this.getExpenseReport(startDate, endDate);
    this.filteredEntries = this.allEntries;
    this.isEmptyResult = this.filteredEntries.length < 0;
  }


  goBack() {
    this.router.navigate(['/expense-dashboard']);
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

    return entries;
  }


  private async getExpenseReport2(startDate: any, endDate: any) {
    this.isLoading = true;
    const expenseReport = await this.financialService.loadExpenseReport(startDate.toISOString(), endDate.toISOString())
    .toPromise()
    .then(res => {
      res as ExpenseReport;
      if (res) {
        this.allEntries = this.getEntries(res.expenseGroups.concat(res.receiptGroups));
        this.filteredEntries = this.allEntries;
        this.isSuccess = true;
        this.isEmptyResult = false;
        this.isLoading = false;
      } else {
        this.allEntries = [];
        this.isSuccess = false;
        this.isEmptyResult = true;
        this.isLoading = false;
      }
    })
    .catch(err => {
      this.isSuccess = false;
      this.isEmptyResult = true;
      this.isLoading = false;
    });


}

  private getExpenseReport(startDate: any, endDate: any) {
    this.isLoading = true;
    this.financialService.loadExpenseReport(startDate.toISOString(), endDate.toISOString())
      .subscribe(async res => {
        if (res) {
          this.allEntries = this.getEntries(res.expenseGroups.concat(res.receiptGroups));
          this.isSuccess = true;
          this.isEmptyResult = false;
          this.isLoading = false;
        } else {
          this.allEntries = [];
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


}

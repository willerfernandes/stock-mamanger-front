import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/entities/lancamento';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { FakeService } from 'src/app/services/fake.service';
import { DateAdapter } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GrupoLancamento } from 'src/app/entities/grupo-lancamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-list-view',
  templateUrl: './entry-list-view.component.html',
  styleUrls: ['./entry-list-view.component.css']
})
export class EntryListViewComponent implements OnInit {


  // Dates
  public startDate: any;
  public endDate: any;

  // Exception Controll
  public isSuccess = false;
  public isEmptyResult = false;
  public isLoading = false;

  public allEntries: Lancamento[] = [];
  public filteredEntries: Lancamento[] = [];

  public isFirtsFilterSelected = false;
  public isSecondFilterSelected = false;
  public isThirdFilterSelected = false;
  public isOtherFilterSelected = false;

  constructor(private authService: AuthenticationService,
              private expenseService: ExpenseService,
              private fakeService: FakeService,
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
    this.getExpenseReport(this.startDate.value, this.endDate.value);
    this.filteredEntries = this.allEntries;
    this.isFirtsFilterSelected = true;
  }

  public firstFilter(): void {
    this.isFirtsFilterSelected = true;
    this.isSecondFilterSelected = false;
    this.isThirdFilterSelected = false;
    this.isOtherFilterSelected = false;

    this.ngOnInit();

  }

  public secondFilter(): void {
    this.isFirtsFilterSelected = false;
    this.isSecondFilterSelected = true;
    this.isThirdFilterSelected = false;
    this.isOtherFilterSelected = false;

    const today = new Date().getDate();
    this.filteredEntries = this.allEntries.filter(entry => new Date(entry.data).getDate() >= today - 7);
  }

  public thirdFilter(): void {
    this.isFirtsFilterSelected = false;
    this.isSecondFilterSelected = false;
    this.isThirdFilterSelected = true;
    this.isOtherFilterSelected = false;

    const today = new Date().getDate();
    this.filteredEntries = this.allEntries.filter(entry => new Date(entry.data).getDate() >= today - 15);
  }

  public otherFilter(): void {
    this.isFirtsFilterSelected = false;
    this.isSecondFilterSelected = false;
    this.isThirdFilterSelected = false;
    this.isOtherFilterSelected = true;
  }

  public filterByDate(startDate: any, endDate: any): void {
    /*const initialFilterDate = new Date(startDate.toISOString());
    const endFilterDate = new Date(endDate.toISOString());
    const today = new Date();
    this.filteredEntries = this.allEntries.filter(entry => today > initialFilterDate && today < endFilterDate);
    */
    this.getExpenseReport(startDate, endDate);
    this.filteredEntries = this.allEntries;
  }


  goBack() {
    this.router.navigate(['/expense-dashboard']);
  }

  private getEntries(entryGroups: GrupoLancamento[]): Lancamento[] {
    let entries: Lancamento[] = [];
    entryGroups.forEach(group => {
      entries = entries.concat(group.lancamentos);
    });

    // sort reversed
    entries.sort( (a, b) => {
      if (new Date(a.data) < new Date(b.data)) {
        return 1;
      } else if (new Date(a.data) > new Date(b.data)) {
        return -1;
      } else {
        return 0;
      }
    });

    return entries;
  }

  getExpenseReport(startDate: any, endDate: any) {
    this.isLoading = true;
    this.fakeService.loadExpenseReport(startDate.toISOString(), endDate.toISOString())
      .subscribe(async res => {
        if (res) {
          this.allEntries = this.getEntries(res.gruposLancamentosDespesas.concat(res.gruposLancamentosReceitas));
          console.log(this.allEntries);
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

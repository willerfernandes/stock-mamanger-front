import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ExpenseReport } from '../entities/expense-report';
import { Entry } from '../entities/lancamento';
import { EntryClass } from '../entities/categoria-lancamento';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl = 'http://localhost:8080';
  expenseReportPath = '/api/v1/expense-report';
  entryPath = '/api/v1/entries';
  entryGroupPath = '/api/v1/classes';

  private httpOptions = {
    params: new HttpParams()
  };

  constructor(private httpClient: HttpClient) { }

  public loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    let filterParams = new HttpParams();
    if (startDate != null) {
      filterParams = filterParams.set('startDate', startDate);
    }
    if (endDate != null) {
      filterParams = filterParams.set('endDate', endDate);
    }
    this.httpOptions.params = filterParams;
    return this.httpClient.get<ExpenseReport>(
      this.baseUrl + this.expenseReportPath, this.httpOptions);
  }

  public saveEntry(entry: Entry): Observable<Entry> {
    return this.httpClient.post<Entry>(this.baseUrl + this.entryPath, JSON.stringify(entry));
  }

  public deleteEntry(id: number): Observable<Entry> {
    return this.httpClient.delete<Entry>(this.baseUrl + this.entryPath + '/' + id);
  }

  public loadEntryGroups(type: string): Observable<EntryClass[]> {
    let filterParams = new HttpParams();
    if (type != null) {
      filterParams = filterParams.set('type', type);
    }
    this.httpOptions.params = filterParams;
    return this.httpClient.get<EntryClass[]>(this.baseUrl + this.entryGroupPath, this.httpOptions);
  }


  public loadEntryGroup(id: number): Observable<EntryClass> {
    return this.httpClient.get<EntryClass>(this.baseUrl + this.entryGroupPath + '/' + id, this.httpOptions);
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    this.httpOptions.params = this.httpOptions.params.set('type', type);
    return this.httpClient.get<EntryClass[]>(this.baseUrl + this.entryGroupPath, this.httpOptions);
  }
}

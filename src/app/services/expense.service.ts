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

  // baseUrl = 'http://localhost:8080';
  baseUrl = 'https://admoney-backend-wdhw7uplaa-uc.a.run.app';
  expenseReportPath = '/api/v1/expense-report';
  entryPath = '/api/v1/entries';
  entryClassesPath = '/api/v1/classes';

  private httpOptions = {
    params: new HttpParams()
  };

  constructor(private httpClient: HttpClient) { }

  // ExpenseReport
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

  // Entry
  public saveEntry(entry: Entry): Observable<Entry> {
    return this.httpClient.post<Entry>(this.baseUrl + this.entryPath, JSON.stringify(entry));
  }

  public deleteEntry(id: number): Observable<Entry> {
    return this.httpClient.delete<Entry>(this.baseUrl + this.entryPath + '/' + id);
  }

  // EntryClass
  public loadEntryClass(id: number): Observable<EntryClass> {
    return this.httpClient.get<EntryClass>(this.baseUrl + this.entryClassesPath + '/' + id, this.httpOptions);
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    let filterParams = new HttpParams();
    if (type != null) {
      filterParams = filterParams.set('type', type);
      this.httpOptions.params = filterParams;
    }
    return this.httpClient.get<EntryClass[]>(this.baseUrl + this.entryClassesPath, this.httpOptions);
  }

  public saveEntryClass(entryClass: EntryClass): Observable<EntryClass> {
    return this.httpClient.put<EntryClass>(this.baseUrl + this.entryClassesPath, JSON.stringify(entryClass));
  }

  public deleteEntryClass(id: number): Observable<EntryClass> {
    return this.httpClient.delete<EntryClass>(this.baseUrl + this.entryClassesPath + '/' + id);
  }
}

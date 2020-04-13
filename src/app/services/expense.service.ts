import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ExpenseReport } from '../entities/expense-report';
import { Lancamento } from '../entities/lancamento';
import { CategoriaLancamento } from '../entities/categoria-lancamento';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl = 'http://localhost:8080';
  expenseReportPath = '/api/v1/extrato';
  entryPath = '/api/v1/lancamentos';
  entryGroupPath = '/api/v1/categorias';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    console.log('Calling expense report...');
    console.log(this.baseUrl + this.expenseReportPath + '?' + 'dataInicio=' + startDate + '&' + 'dataFim=' + endDate);
    console.log('Done!');
    return this.httpClient.get<ExpenseReport>(
     this.baseUrl  + this.expenseReportPath + '?' + 'dataInicio=' + startDate + '&' + 'dataFim=' + endDate, this.httpOptions);
  }

  public saveEntry(entry: Lancamento): Observable<Lancamento> {
    return this.httpClient.post<Lancamento>(this.baseUrl + this.entryPath, JSON.stringify(entry), this.httpOptions);
  }

  public deleteEntry(id: number): Observable<Lancamento> {
    return this.httpClient.delete<Lancamento>(this.baseUrl + this.entryPath + '/' + id, this.httpOptions);
  }

  public loadEntryGroups(): Observable<CategoriaLancamento[]> {
    return this.httpClient.get<CategoriaLancamento[]>(this.baseUrl + this.entryGroupPath, this.httpOptions);
  }
}

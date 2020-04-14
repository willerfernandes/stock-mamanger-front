import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  private httpOptions = {
    params: new HttpParams()
  };

  constructor(private httpClient: HttpClient) { }

  public loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    let filterParams = new HttpParams();
    if (startDate != null) {
      filterParams = filterParams.set('dataInicio', startDate);
    }
    if (endDate != null) {
      filterParams = filterParams.set('dataFim', endDate);
    }
    this.httpOptions.params = filterParams;
    return this.httpClient.get<ExpenseReport>(
      this.baseUrl + this.expenseReportPath, this.httpOptions);
  }

  public saveEntry(entry: Lancamento): Observable<Lancamento> {
    return this.httpClient.post<Lancamento>(this.baseUrl + this.entryPath, JSON.stringify(entry));
  }

  public deleteEntry(id: number): Observable<Lancamento> {
    return this.httpClient.delete<Lancamento>(this.baseUrl + this.entryPath + '/' + id);
  }

  public loadEntryGroups(type: string): Observable<CategoriaLancamento[]> {
    let filterParams = new HttpParams();
    if (type != null) {
      filterParams = filterParams.set('tipo', type);
    }
    this.httpOptions.params = filterParams;
    return this.httpClient.get<CategoriaLancamento[]>(this.baseUrl + this.entryGroupPath, this.httpOptions);
  }
}

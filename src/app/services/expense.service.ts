import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserAuth } from '../entities/user-auth';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl = 'http://localhost:8080';
  path = '/extrato';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  loadExpenseReport(startDate: string, endDate: string): Observable<any> {
    console.log('Calling expense report...');
    console.log(this.baseUrl + this.path + '?' + 'dataInicio=' + startDate + '&' + 'dataFim=' + endDate);
    console.log('Done!');
    return this.httpClient.get(
      this.baseUrl + this.path + '?' + 'dataInicio=' + startDate + '&' + 'dataFim=' + endDate, this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


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

  get(dataInicial: string, dataFinal: string): Observable<any> {

    console.log(this.baseUrl + this.path + '?' + 'dataInicio=' + dataInicial + '&' + 'dataFim=' + dataFinal);
    return this.httpClient.get(this.baseUrl + this.path + '?' + 'dataInicio=' + dataInicial + '&' + 'dataFim=' + dataFinal);
  }
}

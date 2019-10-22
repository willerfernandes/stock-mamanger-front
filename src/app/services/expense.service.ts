import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Expense} from './entities/expense';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

baseUrl:string = "http://localhost:8080";
path:string = "/extrato";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  get(dataInicial: String, dataFinal: String): Observable <>{

    console.log(this.baseUrl + this.path + '?' + 'dataInicio=' + dataInicial + '&' + 'dataFim=' + dataFinal);
    return this.httpClient.get(this.baseUrl + this.path + '?' + 'dataInicio=' + dataInicial + '&' + 'dataFim=' + dataFinal);
  }
}

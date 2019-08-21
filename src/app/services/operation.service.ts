import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Operation} from './entities/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "";
operationPath:string = "/operacoes";
searchPath:string = "/operacao/search";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <Operation[]>{
  	return this.httpClient.get(this.baseUrl + this.operationPath + this.getAllPath);
  }

  get(id: number): Observable <Operation>{
    return this.httpClient.get(this.baseUrl + this.operationPath + "/" + id);
  }

  search(chave: string): Observable <Operation>{
    return this.httpClient.get(this.baseUrl + this.searchPath + "/" + chave);
  }

  save(operation): Operation{
  	return this.httpClient.post(this.baseUrl + this.operationPath, JSON.stringify(operation), this.httpOptions);
  }

  update(operation): Operation{
    return this.httpClient.put(this.baseUrl + this.operationPath + "/" + id, JSON.stringify(operation), this.httpOptions);
  }

   delete(id: number): Observable <Operation>{
    return this.httpClient.delete(this.baseUrl + this.operationPath + "/" + id);
  }
}

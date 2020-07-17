import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Operation } from 'src/app/entities/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  baseUrl = 'http://localhost:8080';
  getAllPath = '';
  operationPath = '/operacoes';
  searchPath = '/operacao/search';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Operation[]> {
    return this.httpClient.get<Operation[]>(this.baseUrl + this.operationPath + this.getAllPath);
  }

  get(id: number): Observable<Operation> {
    return this.httpClient.get<Operation>(this.baseUrl + this.operationPath + "/" + id);
  }

  search(chave: string): Observable<Operation[]> {
    return this.httpClient.get<Operation[]>(this.baseUrl + this.searchPath + "/" + chave);
  }

  save(operation): Observable<Operation> {
    return this.httpClient.post<Operation>(this.baseUrl + this.operationPath, JSON.stringify(operation), this.httpOptions);
  }

  update(operation): Observable<Operation> {
    return this.httpClient.put<Operation>(this.baseUrl +
      this.operationPath + '/' + operation.id, JSON.stringify(operation), this.httpOptions);
  }

  delete(id: number): Observable<Operation> {
    return this.httpClient.delete<Operation>(this.baseUrl + this.operationPath + "/" + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Stock } from 'src/app/entities/stock';
import { Operation } from 'src/app/entities/operation';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl = 'http://localhost:8080';
  getAllPath = '';
  stockPath = '/papeis';
  searchPath = '/papel/search';
  operationPath = '/operacoes';
  alphavantageBaseUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=P8014LL14K1Q6MOL&symbol=';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(this.baseUrl + this.stockPath + this.getAllPath);
  }

  get(id: number): Observable<Stock> {
    return this.httpClient.get<Stock>(this.baseUrl + this.stockPath + '/' + id);
  }

  search(chave: string): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(this.baseUrl + this.searchPath + '/' + chave);
  }

  save(stock): Observable<Stock> {
    return this.httpClient.post<Stock>(this.baseUrl + this.stockPath, JSON.stringify(stock), this.httpOptions);
  }

  update(stock): Observable<Stock> {
    return this.httpClient.put<Stock>(this.baseUrl + this.stockPath + '/' + stock.id, JSON.stringify(stock), this.httpOptions);
  }

  delete(id: number): Observable<Stock> {
    return this.httpClient.delete<Stock>(this.baseUrl + this.stockPath + '/' + id);
  }

  stockPrices(stock: Stock): Observable<Stock> {
    return this.httpClient.get<Stock>(this.alphavantageBaseUrl + stock.codEmpresaBovespa);
  }

  getStockOperations(stock: Stock): Observable<Operation> {
    return this.httpClient.get<Operation>(this.baseUrl + this.stockPath + '/' + stock.id + this.operationPath);
  }

}

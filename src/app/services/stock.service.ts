import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Stock} from './entities/stock';
import {Stock} from './entities/stock-info';

@Injectable({
  providedIn: 'root'
})
export class StockService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "/all";
stockPath:string = "/papel";
searchPath:string = "/papel/search";
operationPath:string = "/operacoes";
alphavantageBaseUrl:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=P8014LL14K1Q6MOL&symbol=";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <Stock[]>{
  	return this.httpClient.get(this.baseUrl + this.stockPath + this.getAllPath);
  }

  get(id: number): Observable <Stock>{
    return this.httpClient.get(this.baseUrl + this.stockPath + "/" + id);
  }

  search(chave: string): Observable <Stock>{
    return this.httpClient.get(this.baseUrl + this.searchPath + "/" + chave);
  }

  save(stock): Stock{
  	return this.httpClient.post(this.baseUrl + this.stockPath, JSON.stringify(stock), this.httpOptions);
  }

  update(stock): Stock{
    return this.httpClient.put(this.baseUrl + this.stockPath, JSON.stringify(stock), this.httpOptions);
  }

   delete(id: number): Observable <Stock>{
    return this.httpClient.delete(this.baseUrl + this.stockPath + "/" + id);
  }

  stockPrices(stock: Stock): Observable <Stock>{
    return this.httpClient.get(this.alphavantageBaseUrl + stock.codEmpresaBovespa);
  }

  getStockOperations(stock: Stock): Observable <Operation>{
    return this.httpClient.get(this.baseUrl + this.stockPath + "/" + stock.id + this.operationPath);
  }

}

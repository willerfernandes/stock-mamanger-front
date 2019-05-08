import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Stock} from './entities/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "/all";
userPath:string = "/papel";
searchPath:string = "/papel/search";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <Stock[]>{
  	return this.httpClient.get(this.baseUrl + this.userPath + this.getAllPath);
  }

  get(id: number): Observable <Stock>{
    return this.httpClient.get(this.baseUrl + this.userPath + "/" + id);
  }

  search(chave: string): Observable <Stock>{
    return this.httpClient.get(this.baseUrl + this.searchPath + "/" + chave);
  }

  save(stock): Stock{
  	return this.httpClient.post(this.baseUrl + this.userPath, JSON.stringify(stock), this.httpOptions);
  }

  update(stock): Stock{
    return this.httpClient.put(this.baseUrl + this.userPath, JSON.stringify(stock), this.httpOptions);
  }

   delete(id: number): Observable <Stock>{
    return this.httpClient.delete(this.baseUrl + this.userPath + "/" + id);
  }
}

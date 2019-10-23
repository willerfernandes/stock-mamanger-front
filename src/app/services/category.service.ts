import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Category} from './entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "";
categoryPath:string = "/categorias";
searchPath:string = "/categorias";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <Category[]>{
  	return this.httpClient.get(this.baseUrl + this.categoryPath + this.getAllPath);
  }

  get(id: number): Observable <Category>{
    return this.httpClient.get(this.baseUrl + this.categoryPath + "/" + id);
  }

  search(chave: string): Observable <Expense>{
    return this.httpClient.get(this.Category + this.searchPath + "/" + chave);
  }

  save(category): Category{
  	return this.httpClient.post(this.baseUrl + this.categoryPath, JSON.stringify(category), this.httpOptions);
  }

  update(category): Category{
    return this.httpClient.put(this.baseUrl + this.categoryPath + "/" + category.id, JSON.stringify(category), this.httpOptions);
  }

   delete(id: number): Observable <Category>{
    return this.httpClient.delete(this.baseUrl + this.categoryPath + "/" + id);
  }
}

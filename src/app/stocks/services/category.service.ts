import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'http://localhost:8080';
  getAllPath = '';
  categoryPath = '/categorias';
  searchPath = '/categorias';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + this.categoryPath + this.getAllPath);
  }

  get(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + this.categoryPath + '/' + id);
  }

  search(chave: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryPath + this.searchPath + '/' + chave);
  }

  save(category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseUrl + this.categoryPath, JSON.stringify(category), this.httpOptions);
  }

  update(category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseUrl + this.categoryPath + '/' + category.id, JSON.stringify(category), this.httpOptions);
  }

  delete(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.baseUrl + this.categoryPath + '/' + id);
  }
}

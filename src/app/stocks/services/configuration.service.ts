import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Config } from 'src/app/stocks/entities/config';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  baseUrl = 'http://localhost:8080';
  getAllPath = '';
  configPath = '/configuracoes';
  searchPath = '/configuracoes/search';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Config[]> {
    return this.httpClient.get<Config[]>(this.baseUrl + this.configPath + this.getAllPath);
  }

  get(id: number): Observable<Config> {
    return this.httpClient.get<Config>(this.baseUrl + this.configPath + '/' + id);
  }

  search(chave: string): Observable<Config[]> {
    return this.httpClient.get<Config[]>(this.baseUrl + this.searchPath + '/' + chave);
  }

  save(configuration): Observable<Config> {
    return this.httpClient.post<Config>(this.baseUrl + this.configPath, JSON.stringify(configuration), this.httpOptions);
  }

  update(configuration): Observable<Config> {
    return this.httpClient.put<Config>(this.baseUrl + this.configPath, JSON.stringify(configuration), this.httpOptions);
  }

  delete(id: number): Observable<Config> {
    return this.httpClient.delete<Config>(this.baseUrl + this.configPath + '/' + id);
  }

}

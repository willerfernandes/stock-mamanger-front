import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Config} from './../register/configuration/config/config';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "";
configPath:string = "/configuracoes";
searchPath:string = "/configuracoes/search";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <Config[]>{
  	return this.httpClient.get(this.baseUrl + this.configPath + this.getAllPath);
  }

  get(id: number): Observable <Config>{
    return this.httpClient.get(this.baseUrl + this.configPath + "/" + id);
  }

  search(chave: string): Observable <Config>{
    return this.httpClient.get(this.baseUrl + this.searchPath + "/" + chave);
  }

  save(configuration): Config{
  	return this.httpClient.post(this.baseUrl + this.configPath, JSON.stringify(configuration), this.httpOptions);
  }

  update(configuration): Config{
    return this.httpClient.put(this.baseUrl + this.configPath, JSON.stringify(configuration), this.httpOptions);
  }

   delete(id: number): Observable <Config>{
    return this.httpClient.delete(this.baseUrl + this.configPath + "/" + id);
  }
  
}

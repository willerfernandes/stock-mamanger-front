import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {ConfigComponent} from './config/config.component';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

baseUrl:string = "http://localhost:8080";
configPath:string = "/config";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


 configMock: ConfigComponent;


  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <ConfigComponent[]>{
  	return this.httpClient.get(this.baseUrl + this.configPath);
  }

  save(): Observable<ConfigComponent>{
  	//this.configMock.id = 2;
  	//this.configMock.chave = "teste_angular";
  	//this.configMock.valor = "cadastrou";
  	return this.httpClient.post(this.baseUrl + this.configPath, "{\"chave\":\"stop_low\",\"valor\":\"1\"}", this.httpOptions);
  }

  saveFromSite(employee): Observable<ConfigComponent> {
  
    return this.httpClient.post<ConfigComponent>(this.baseUrl + this.configPath, JSON.stringify(employee), this.httpOptions);
  }  
  
}

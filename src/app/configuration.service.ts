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
getAllPath:string = "/all";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <ConfigComponent[]>{
  	return this.httpClient.get(this.baseUrl + this.configPath + this.getAllPath);
  }

  get(chave: string): Observable <ConfigComponent>{
    return this.httpClient.get(this.baseUrl + this.configPath + "/" + chave);
  }

  save(configuration): ConfigComponent{
  	return this.httpClient.post(this.baseUrl + this.configPath, JSON.stringify(configuration), this.httpOptions);
  }

  update(configuration): ConfigComponent{
    console.log("Json gerado:" + JSON.stringify(configuration));
    return this.httpClient.put(this.baseUrl + this.configPath, JSON.stringify(configuration), this.httpOptions);
  }

   delete(chave: string): Observable <ConfigComponent>{
    return this.httpClient.delete(this.baseUrl + this.configPath + "/" + chave);
  }
  
}

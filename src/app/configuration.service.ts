import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigComponent} from './config/config.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

baseUrl:string = "http://localhost:8080";
configPath:string = "/config"


  constructor(private httpClient : HttpClient) { }

  getAll(){
  	return this.httpClient.get(this.baseUrl + this.configPath);
  }

  save(){
  	return this.httpClient.post(this.baseUrl + this.configPath);
  }
  
}

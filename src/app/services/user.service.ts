import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {User} from './entities/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "/all";
userPath:string = "/usuario";
searchPath:string = "/usuario/search";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable <User[]>{
  	return this.httpClient.get(this.baseUrl + this.userPath + this.getAllPath);
  }

  get(id: number): Observable <User>{
    return this.httpClient.get(this.baseUrl + this.userPath + "/" + id);
  }

  search(chave: string): Observable <User>{
    return this.httpClient.get(this.baseUrl + this.searchPath + "/" + chave);
  }

  save(user): User{
  	return this.httpClient.post(this.baseUrl + this.userPath, JSON.stringify(user), this.httpOptions);
  }

  update(user): User{
    return this.httpClient.put(this.baseUrl + this.userPath, JSON.stringify(user), this.httpOptions);
  }

   delete(id: number): Observable <User>{
    return this.httpClient.delete(this.baseUrl + this.userPath + "/" + id);
  }
}

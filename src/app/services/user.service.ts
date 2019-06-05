import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {User} from './../entities/user';
import {UserBalance} from './../entities/user-balance';
import {LoginInfo} from './../entities/login-info';


@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl:string = "http://localhost:8080";
getAllPath:string = "/all";
userPath:string = "/usuario";
searchPath:string = "/usuario/search";
balancePath:string = "/posicao";
validateUserPath:string = "/validacao";

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

  delete(id: number): Observable <>{
    return this.httpClient.delete(this.baseUrl + this.userPath + "/" + id);
  }

  getBalance(id: number): Observable <UserBalance>{
    return this.httpClient.get(this.baseUrl + this.userPath + "/" + id + this.balancePath);
  }

  login(loginInfo: LoginInfo): Observable<> {
    return this.httpClient.post(this.baseUrl + this.userPath + this.validateUserPath, JSON.stringify(loginInfo), this.httpOptions)
  }

}

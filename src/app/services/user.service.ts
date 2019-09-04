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
getAllPath:string = "";
userPath:string = "/usuarios";
searchPath:string = "/usuarios/filtro";
balancePath:string = "/posicao";
validateUserPath:string = "/validacao";

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'login' : '',
      'senha' : ''
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
    return this.httpClient.put(this.baseUrl + this.userPath + "/" + user.id, JSON.stringify(user), this.httpOptions);
  }

  delete(id: number): Observable <>{
    return this.httpClient.delete(this.baseUrl + this.userPath + "/" + id);
  }

  getBalance(id: number): Observable <UserBalance>{
    return this.httpClient.get(this.baseUrl + this.userPath + "/" + id + this.balancePath);
  }

  login(loginInfo: LoginInfo): Observable<> {

    this.httpOptions.headers =  this.httpOptions.headers.set('login', loginInfo.login);
    this.httpOptions.headers =  this.httpOptions.headers.set('senha', loginInfo.senha);
    return this.httpClient.get(this.baseUrl + this.userPath + this.validateUserPath, this.httpOptions);
  }

}

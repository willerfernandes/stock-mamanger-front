import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from 'src/app/common/entities/user';
import { UserBalance } from '../entities/user-balance';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080';
  getAllPath = '';
  userPath = '/usuarios';
  searchPath = '/usuarios/filtro';
  balancePath = '/posicao';
  validateUserPath = '/validacao';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      login: '',
      senha: ''
    })
  };


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + this.userPath + this.getAllPath);
  }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + this.userPath + '/' + id);
  }

  search(chave: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + this.searchPath + '/' + chave);
  }

  save(user): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + this.userPath, JSON.stringify(user), this.httpOptions);
  }

  update(user): Observable<User> {
    return this.httpClient.put<User>(this.baseUrl + this.userPath + '/' + user.id, JSON.stringify(user), this.httpOptions);
  }

  delete(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.baseUrl + this.userPath + '/' + id);
  }

  getBalance(id: number): Observable<UserBalance[]> {
    return this.httpClient.get<UserBalance[]>(this.baseUrl + this.userPath + '/' + id + this.balancePath);
  }

}

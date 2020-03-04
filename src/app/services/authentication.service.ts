import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../entities/credentials';
import { User } from '../entities/user';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient, public dialog: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  openDialog(errorMessage: string, durationTime: number): void {
    this.dialog.open(errorMessage, 'OK', {
      panelClass: ['snackbarStyle'],
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'left',
      duration: durationTime == null ? null : durationTime
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log('Authorizing...');
    console.log('Calling: ' + `${environment.apiUrl}/login`);
    const credentials: Credentials = { login: '', senha: '' };
    credentials.login = username;
    credentials.senha = password;
    return this.http.post<any>('http://localhost:8081/login', JSON.stringify(credentials), this.httpOptions)
      .pipe(map(user => {
        console.log('Response from ' + `${environment.apiUrl}/login` + ':');
        console.log(user.status);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

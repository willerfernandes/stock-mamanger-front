import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../entities/credentials';
import { User } from '../entities/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient, public dialog: MatSnackBar, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // console.log('Calling: ' + `${environment.apiUrl}/login`);
    const credentials: Credentials = { login: '', password: '' };
    credentials.login = username;
    credentials.password = password;
    return this.http.post<any>('http://localhost:8081/login', JSON.stringify(credentials), this.httpOptions)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.loggedIn.next(true);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../entities/credentials';
import { User } from '../entities/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAuth } from '../entities/user-auth';
import { SignupCredentials } from '../entities/signup-credentials';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  baseUrl = environment.authenticationApiUrl;

  loginUrl = this.baseUrl + '/api/v1/login';
  signupUrl = this.baseUrl + '/api/v1/users';
  usernameAvaililityUrl = this.baseUrl + '/api/v1/users/availabiliy';

  constructor(private http: HttpClient, public dialog: MatSnackBar, private router: Router, private storageService: StorageService) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(this.storageService.findUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams()
  };

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // console.log('Calling: ' + `${environment.apiUrl}/login`);
    const credentials: Credentials = { login: '', password: '' };
    credentials.login = username;
    credentials.password = password;
    return this.http.post<UserAuth>(this.loginUrl, JSON.stringify(credentials), this.httpOptions)
      .pipe(map(user => {
        this.registerUser(user);
        this.loggedIn.next(true);
        return user;
      }));
  }

  public registerUser(user: UserAuth) {
    this.storageService.saveCurrentUser(user);
    this.currentUserSubject.next(user);
  }

  logout() {
    // remove user from local storage to log user out
    this.storageService.saveLastUser();
    this.storageService.deleteCurrentUser();
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  checkUsernameAvailability(login: string) {

    let filterParams = new HttpParams();
    if (login != null) {
      filterParams = filterParams.set('login', login);
      this.httpOptions.params = filterParams;
    }
    return this.http.get<boolean>(this.usernameAvaililityUrl, this.httpOptions);
  }

  public createUser(credentials: SignupCredentials) {
    return this.http.post<boolean>(this.signupUrl, JSON.stringify(credentials), this.httpOptions);
  }

}

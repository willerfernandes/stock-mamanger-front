import { Component, OnInit } from '@angular/core';
import { LoginInfo } from './../../entities/login-info';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FakeService } from 'src/app/services/fake.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  public baseURL = 'http://localhost:4200/';
  public registerUserPath = this.baseURL + 'signup';

  constructor(private authenticationService: AuthenticationService, private fakeService: FakeService, private router: Router) { }

  isAuthorized: boolean;
  isUnauthorized: boolean;

  ngOnInit() {
  }


  login(username: string, password: string) {
    const loginInfo: LoginInfo = { login: '', senha: '' };
    loginInfo.login = username;
    loginInfo.senha = password;
    this.fakeService.login(username, password).subscribe(res => {
      this.isAuthorized = true;
      this.isUnauthorized = false;
      sessionStorage.setItem('currentUser', JSON.stringify(res));
      this.router.navigate(['/home']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { LoginInfo } from './../../entities/login-info';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  isAuthorized: boolean;
  isUnauthorized: boolean;

  ngOnInit() {
  }


  login(username: string, password: string) {
    const loginInfo: LoginInfo = { login: '', senha: '' };
    loginInfo.login = username;
    loginInfo.senha = password;

    this.authenticationService.login(username, password).subscribe(res => {
      this.isAuthorized = res != null;
      this.isUnauthorized = !res;
      if (this.isAuthorized) {
        sessionStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['/home']);
      }
    });
  }
}

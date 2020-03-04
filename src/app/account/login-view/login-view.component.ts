import { Component, OnInit, Input } from '@angular/core';
import { LoginInfo } from './../../entities/login-info';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FakeService } from 'src/app/services/fake.service';
import { environment } from 'src/environments/environment';
import { empty } from 'rxjs';


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

  usernamePlaceholder = 'Nome do usuário';
  passwordPlaceholder = 'Insira a senha';

  ngOnInit() {
  }


  login(username: string, password: string) {
    if (this.validateFields(username, password)) {
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

  onTypeUsername(event: any) {
    this.usernamePlaceholder = 'Nome do usuário';
  }

  onTypePassword(event: any) {
    this.passwordPlaceholder = 'Insira a senha';
  }

  private validateFields(username: string, password: string): boolean {
    let isAllRequiredFieldsFilled = true;
    if (username === '') {
      this.usernamePlaceholder = 'Campo Obrigatório';
      isAllRequiredFieldsFilled = false;
    }
    if (password === '') {
      this.passwordPlaceholder = 'Campo Obrigatório';
      isAllRequiredFieldsFilled = false;
    }
    if (!isAllRequiredFieldsFilled) {
      this.authenticationService.openDialog('Existem campos obrigatórios não preenchidos', 3000);
    }
    return isAllRequiredFieldsFilled;
  }

}

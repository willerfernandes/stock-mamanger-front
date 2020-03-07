import { Component, OnInit, Input } from '@angular/core';
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

  isLoading = false;

  usernamePlaceholder = 'Nome do usuário';
  passwordPlaceholder = 'Insira a senha';

  ngOnInit() {
  }


  login(username: string, password: string) {
    this.isLoading = true;
    if (this.validateFields(username, password)) {
      this.fakeService.login(username, password).subscribe(res => {
        sessionStorage.setItem('currentUser', JSON.stringify(res));
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 401) {
          this.authenticationService.openDialog('Usuário ou senha incorretos', 3000);
        }
      });
    }
  }

  onTypeUsername(event: any) {
    this.usernamePlaceholder = 'Nome do usuário';
  }

  onTypePassword(event: any) {
    this.passwordPlaceholder = 'Insira a senha';
  }

  private validateFields(username: string, password: string) {
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
      this.isLoading = false;
      this.authenticationService.openDialog('Existem campos obrigatórios não preenchidos', 3000);
    }
    return isAllRequiredFieldsFilled;
  }

}

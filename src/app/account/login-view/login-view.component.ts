import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FakeService } from 'src/app/services/fake.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/entities/user';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  public baseURL = 'http://localhost:4200';
  public registerUserPath = this.baseURL + '/signup';

  constructor(private authenticationService: AuthenticationService,
              private fakeService: FakeService,
              private router: Router,
              private messageService: MessageService) { }

  isLoading = false;

  public isFakeServer = false;

  usernamePlaceholder = 'Nome do usuário';
  passwordPlaceholder = 'Insira a senha';

  ngOnInit() {
    this.isFakeServer = this.fakeService.isFakeServer;
    if (this.fakeService.isLoggedIn) {
      this.router.navigate(['/expense-dashboard']);
    }
  }


  login(username: string, password: string) {
    this.isLoading = true;
    if (this.validateFields(username, password)) {
      this.authenticationService.login(username, password).subscribe(res => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.isLoading = false;
        this.router.navigate(['/expense-dashboard']);
      },
      error => {
        if (error.status === 401) {
          this.messageService.openMessageBar('Usuário ou senha incorretos', 3000);
        }
      });
    }
  }


  navSignUpPage() {
    this.router.navigate(['/signup']);
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
      this.messageService.openMessageBar('Existem campos obrigatórios não preenchidos', 3000);
    }
    return isAllRequiredFieldsFilled;
  }

}

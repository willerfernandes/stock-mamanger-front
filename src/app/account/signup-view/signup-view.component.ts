import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FakeService } from 'src/app/services/fake.service';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css']
})
export class SignupViewComponent implements OnInit {

  public baseURL = 'http://localhost:4200/';
  public loginPath = this.baseURL + 'login';

  successMessage = 'Cadstrado com sucesso';

  public isFakeServer  = false;

  constructor(private userService: UserService, private authService: AuthenticationService,
              private router: Router, private fakeService: FakeService) { }

  ngOnInit() {
    this.isFakeServer = this.fakeService.isFakeServer;
    if (this.fakeService.isLoggedIn) {
      this.router.navigate(['/expense-dashboard']);
    }
  }

  public signUp(login: string, password: string, repeatPsw: string, name: string) {
    this.validateFields(login, password, repeatPsw, name);
    const user = new User();
    user.id = 0;
    user.login = login;
    user.nome = name;
    user.senha = password;
    this.fakeService.save(user).subscribe(res => {
      this.authService.openDialog(this.successMessage, 3000);
      this.router.navigate(['/login']);
    },
      err => {
        this.router.navigate(['/homr']);
      });

  }

  private validateFields(login: string, password: string, repeatPsw: string, name: string): boolean {
    if (login == null || password == null || repeatPsw == null || name == null
        || login === '' || password === '' || repeatPsw === '' || name === '' ) {
      this.authService.openDialog('Preencha todos os campos obrigatórios', 3000);
      throw new Error('Preencha todos os campos obrigatórios');
    }

    if (password !== repeatPsw) {
      this.authService.openDialog('Os valores digitados nos campos \'Senha\' e \'Repita sua Senha\' não são iguais!', 3000);
      throw new Error('Os valores digitados nos campos \'Senha\' e \'Repita sua Senha\' não são iguais!');
    }


    return true;
  }

}


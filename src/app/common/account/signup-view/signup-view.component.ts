import { Component, OnInit } from '@angular/core';
import { OnlineAuthenticationService } from 'src/app/common/services/online-authentication.service';
import { Router } from '@angular/router';

import { MessageService } from 'src/app/common/services/message.service';
import { SignupCredentials } from '../../entities/signup-credentials';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css']
})
export class SignupViewComponent implements OnInit {

  isLoading = false;

  signUpForm: FormGroup;

  createForm() {
    this.signUpForm = this.fb.group({
      login: ['', Validators.required],
      psw: ['', Validators.required ],
      repeatPsw: ['', Validators.required ],
      name: ['', Validators.required ]
    });
  }

  constructor(private authService: OnlineAuthenticationService,
              private router: Router,  private messageService: MessageService, private fb: FormBuilder) { this.createForm(); }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(logged => {
      if (logged) {
        this.router.navigate(['/expense-dashboard']);
      }
    });
  }

  public signUp() {
    const login = this.signUpForm.value.login;
    const password = this.signUpForm.value.psw;
    const repeatPsw = this.signUpForm.value.repeatPsw;
    const name = this.signUpForm.value.name;

    this.validateFields(login, password, repeatPsw, name);
    this.isLoading = true;
    const credentials = new SignupCredentials();
    credentials.login = login;
    credentials.name = name;
    credentials.password = password;

    this.authService.checkUsernameAvailability(login).subscribe( res => {
      if (!res ) {
        this.isLoading = false;
        this.messageService.openMessageBar('O nome de usuário "' + login + '" não está disponível', 3000);
      } else {
        this.authService.createUser(credentials).subscribe( () => {
          this.isLoading = false;
          this.messageService.openMessageBar('Cadstrado com sucesso', 3000);
          this.router.navigate(['/login']);
        },
          err => {
            this.isLoading = false;
            this.messageService.openMessageBar('Erro ao cadastrar usuário', 3000);
            this.router.navigate(['/home']);
          });
      }
    },
    err => {
      this.isLoading = false;
      this.messageService.openMessageBar('Erro ao cadastrar usuário', 3000);
    });

  }

  private validateFields(login: string, password: string, repeatPsw: string, name: string): boolean {
    if (!this.signUpForm.valid) {
      this.messageService.openMessageBar('Preencha todos os campos obrigatórios', 3000);
      throw new Error('Preencha todos os campos obrigatórios');
    }
    if (password !== repeatPsw) {
      this.messageService.openMessageBar('Os valores digitados nos campos \'Senha\' e \'Repita sua Senha\' não são iguais!', 3000);
      throw new Error('Os valores digitados nos campos \'Senha\' e \'Repita sua Senha\' não são iguais!');
    }
    return true;
  }

    public goBack() {
      this.router.navigate(['/login']);
    }

}


import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ThemePalette } from '@angular/material';
import { MessageService } from 'src/app/common/services/message.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FinancialService } from 'src/app/financial/services/financial.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private financialService: FinancialService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) { this.createForm(); }

  isLoading = false;

  public isOfflineMode = false;
  changeConnectionModeLabel = 'Modo Offline';
  color: ThemePalette = 'primary';

  usernamePlaceholder = 'Nome do usuário';
  passwordPlaceholder = 'Insira a senha';

  loginForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      offlineModeControl: [false]
    });
  }

  ngOnInit() {
    if (this.authenticationService.loggedIn()) {
      this.router.navigate(['/expense-dashboard']);
    }
  }

  public isOffline() {
    console.log(this.loginForm.value.offlineModeControl);
    return this.loginForm.value.offlineModeControl === 'true';
  }

  login() {

    this.isLoading = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const isOffline = this.loginForm.value.offlineModeControl;

    if (this.validateFields(username, password, isOffline)) {
      this.authenticationService.login(username, password, isOffline).subscribe(user => {
        this.authenticationService.setCurrentUser(user);
        if (this.isDataSyncDirty()) {
          this.financialService.sync(true).then( () => {
            this.proceedLogin();
          });
        } else {
          this.financialService.updateLocalStorageFromDatabase();
          this.proceedLogin();
        }
      },
      error => {
        this.isLoading = false;
        if (error.status === 401) {
          this.messageService.openMessageBar('Usuário ou senha incorretos', null);
        } else if (error.status === 0) {
          this.messageService.openMessageBar('Houve um problema ao conectar com o servidor. Que tal tentar o modo Offline?', null);
        }
      });
    }
  }

  private proceedLogin(): void {
    this.isLoading = false;
    this.setDataSynClean();
    this.router.navigate(['/expense-dashboard']);
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

  public onOfflineModeSliderChange(): void {
    this.isOfflineMode = !this.isOfflineMode;
  }

  private validateFields(username: string, password: string, offlineMode: boolean) {
    let isAllRequiredFieldsFilled = true;
    if (username === '') {
      this.usernamePlaceholder = 'Campo Obrigatório';
      isAllRequiredFieldsFilled = false;
    }
    if (password === '' && !offlineMode) {
      this.passwordPlaceholder = 'Campo Obrigatório';
      isAllRequiredFieldsFilled = false;
    }
    if (!isAllRequiredFieldsFilled) {
      this.isLoading = false;
      this.messageService.openMessageBar('Existem campos obrigatórios não preenchidos', 3000);
    }
    return isAllRequiredFieldsFilled;
  }

  public isDataSyncDirty(): boolean {
    return this.authenticationService.isDirty();
  }

  public setDataSynClean(): void {
    this.authenticationService.setIsClean();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ThemePalette } from '@angular/material';
import { MessageService } from 'src/app/common/services/message.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FinancialService } from 'src/app/financial/services/financial.service';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private financialService: FinancialService,
              private router: Router,
              private messageService: MessageService) { }

  isLoading = false;

  public isOfflineMode = false;
  changeConnectionModeLabel = 'Modo Offline';
  color: ThemePalette = 'primary';

  usernamePlaceholder = 'Nome do usuário';
  passwordPlaceholder = 'Insira a senha';



  ngOnInit() {
    if (this.authenticationService.loggedIn()) {
      this.router.navigate(['/expense-dashboard']);
    }
  }

  login(username: string, password: string) {

    this.isLoading = true;
    const isOffline = this.isOfflineMode;
    if (this.validateFields(username, password)) {
      this.authenticationService.login(username, password, isOffline).subscribe(user => {
        if (this.isDataSyncDirty()) {
          this.financialService.sync();
          this.setDataSynClean();
        } else {
          this.financialService.updateLocalStorageFromDatabase();
          this.setDataSynClean();
        }
        this.authenticationService.setCurrentUser(user);
        this.isLoading = false;
        this.router.navigate(['/expense-dashboard']);
      },
      error => {
        this.isLoading = false;
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

  public onOfflineModeSliderChange(): void {
    this.isOfflineMode = !this.isOfflineMode;
  }

  private validateFields(username: string, password: string) {
    let isAllRequiredFieldsFilled = true;
    if (username === '') {
      this.usernamePlaceholder = 'Campo Obrigatório';
      isAllRequiredFieldsFilled = false;
    }
    if (password === '' && !this.isOfflineMode) {
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

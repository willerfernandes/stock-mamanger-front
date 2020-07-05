import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/entities/user';
import { MessageService } from 'src/app/services/message.service';
import { RouterService } from 'src/app/services/router.service';
import { ThemePalette } from '@angular/material';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private routerService: RouterService,
              private router: Router,
              private messageService: MessageService) { }

  isLoading = false;

  public isOfflineMode = false;
  changeConnectionModeLabel = 'Modo Offline';
  color: ThemePalette = 'primary';

  usernamePlaceholder = 'Nome do usuário';
  passwordPlaceholder = 'Insira a senha';

  ngOnInit() {
    if (this.routerService.loggedIn()) {
      this.router.navigate(['/expense-dashboard']);
    }
  }

  login(username: string, password: string) {
    this.isLoading = true;
    const isOffline = this.isOfflineMode;
    if (this.validateFields(username, password)) {
      this.routerService.login(username, password, isOffline).subscribe(user => {
        this.routerService.setCurrentUser(user);
        this.routerService.updateLocalStorageFromDatabase();
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

}

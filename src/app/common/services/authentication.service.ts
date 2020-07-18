import { Injectable } from '@angular/core';
import { OnlineAuthenticationService } from 'src/app/common/services/online-authentication.service';
import { FakeService } from 'src/app/financial/services/fake.service';
import { StorageService } from 'src/app/financial/services/storage.service';
import { MessageService } from 'src/app/financial/services/message.service';
import { Router } from '@angular/router';
import { UserAuth } from '../entities/user-auth';
import { OfflineAuthenticationService } from './offline-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private onlineAuthenticationService: OnlineAuthenticationService,
              private offlineAuthenticationService: OfflineAuthenticationService,
              private storageService: StorageService,
              private messageService: MessageService,
              private router: Router
    ) { }

    connectionMode = 'offline';

  public isOnline(): boolean {
    return this.storageService.getConnectionMode()  === 'online';
  }

  public connect(): void {
    this.storageService.saveConnectionMode('online');
    const user = this.storageService.findUser();
    if (user != null) {
      this.onlineAuthenticationService.registerUser(user);
    } else {
      this.messageService.openMessageBar('Sua sessão expirou, faça login novamente', 2000);
      this.router.navigate(['/login']);
    }

  }

  public disconnect(): void {
    this.storageService.saveConnectionMode('offline');
    this.messageService.openMessageBar('Você está offline! Seus lançamentos serão salvos localmente até ficar online novamente.', null);

  }

  clearConnectionMode(): void {
    this.storageService.deleteConnectionMode();
  }

  setConnectionMode(isOfflineMode: boolean): void {
    if (isOfflineMode) {
      this.storageService.saveConnectionMode('offline');
    } else {
      this.storageService.saveConnectionMode('online');
    }
  }

  public getCurrentUser() {
    if (this.isOnline()) {
      return this.onlineAuthenticationService.currentUserValue;
    } else {
      return this.offlineAuthenticationService.currentUserValue;
    }
  }

  public setCurrentUser(user: UserAuth) {
    this.storageService.saveCurrentUser(user);
  }

  public loggedIn() {
    if (this.isOnline()) {
      return this.onlineAuthenticationService.isLoggedIn;
    } else {
      return this.offlineAuthenticationService.isLoggedIn;
    }
  }

  public getCurrentUserValue() {
    if (this.isOnline()) {
      return this.onlineAuthenticationService.currentUserValue;
    } else {
      return this.offlineAuthenticationService.currentUserValue;
    }
  }

  login(username: string, password: string, isOfflineMode: boolean) {
    this.setConnectionMode(isOfflineMode);
    let loginResponse = this.offlineAuthenticationService.login(username, password);
    if (this.isOnline()) {
      loginResponse = this.onlineAuthenticationService.login(username, password);
    }
    return loginResponse;
  }

  logout() {
    this.clearConnectionMode();
    let logoutResponse = this.offlineAuthenticationService.logout();
    if (this.isOnline()) {
      logoutResponse = this.onlineAuthenticationService.logout();
    }
    return logoutResponse;
  }

}

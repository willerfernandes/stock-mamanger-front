import { Injectable } from '@angular/core';
import { OnlineAuthenticationService } from '../../common/services/online-authentication.service';
import { ExpenseService } from './expense.service';
import { FakeService } from './fake.service';
import { Entry } from '../entities/entry';
import { Observable } from 'rxjs';
import { EntryClass } from '../entities/entry-class';
import { StorageService } from './storage.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/common/entities/user-auth';
import { SignupCredentials } from 'src/app/common/entities/signup-credentials';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private authenticationService: OnlineAuthenticationService,
              private expenseService: ExpenseService,
              private fakeService: FakeService,
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
      this.authenticationService.registerUser(user);
    } else {
      this.messageService.openMessageBar('Sua sessão expirou, faça login novamente', 2000);
      this.router.navigate(['/login']);
    }

    this.sync();
  }

  public sync() {
    const entries = this.storageService.findAllEntries();
    this.expenseService.syncEntries(entries).subscribe(entriesOnDatabase => {
      if (entriesOnDatabase.status === 204) {
        this.messageService.openMessageBar('Você está online novamente! Seus novos lançamentos foram sincronizados com o servidor.', null);
        return;
      }
      if (entriesOnDatabase.status === 200) {
        this.storageService.saveAllEntries(entriesOnDatabase.body);
      }
      this.messageService.openMessageBar('Você está online novamente! Seus novos lançamentos foram sincronizados com o servidor.', null);

    },
      err => {
        this.messageService.openMessageBar('Houve um erro ao conectar com o servidor', 2000);
      });
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

  updateLocalStorageFromDatabase(): void {
    try {
      if (this.isOnline()) {
        this.expenseService.loadEntryClasses('').subscribe(clases => {
          this.storageService.saveAllEntryClasses(clases);
        });
        this.expenseService.loadAllEntries().subscribe(entries => {
          this.storageService.saveAllEntries(entries);
        });
      }
    } catch (error) {
      console.log('Error while sincronizing with database');
    }
  }

  // authentitacion
  public getCurrentUser() {
    if (this.isOnline()) {
      return this.authenticationService.currentUserValue;
    } else {
      return this.fakeService.currentUserValue;
    }
  }

  public setCurrentUser(user: UserAuth) {
    this.storageService.saveCurrentUser(user);
  }

  public loggedIn() {
    if (this.isOnline()) {
      return this.authenticationService.isLoggedIn;
    } else {
      return this.fakeService.isLoggedIn;
    }
  }

  public getCurrentUserValue() {
    if (this.isOnline()) {
      return this.authenticationService.currentUserValue;
    } else {
      return this.fakeService.currentUserValue;
    }
  }

  login(username: string, password: string, isOfflineMode: boolean) {
    this.setConnectionMode(isOfflineMode);
    let loginResponse = this.fakeService.login(username, password);
    if (this.isOnline()) {
      loginResponse = this.authenticationService.login(username, password);
    }
    return loginResponse;
  }

  logout() {
    this.clearConnectionMode();
    let logoutResponse = this.fakeService.logout();
    if (this.isOnline()) {
      logoutResponse = this.authenticationService.logout();
    }
    return logoutResponse;
  }


  // expenses
  loadExpenseReport(startDate: string, endDate: string) {
    if (this.isOnline()) {
      return this.expenseService.loadExpenseReport(startDate, endDate);
    } else {
      return this.fakeService.loadExpenseReport(startDate, endDate);
    }
  }

  saveEntry(entry: Entry) {
    if (this.isOnline()) {
      return this.expenseService.saveEntry(entry);
    } else {
      return this.fakeService.saveEntry(entry);
    }
  }

  public loadEntryClass(id: number): Observable<EntryClass> {
    if (this.isOnline()) {
      return this.expenseService.loadEntryClass(id);
    } else {
      return this.fakeService.loadEntryClass(id);
    }
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    if (this.isOnline()) {
      return this.expenseService.loadEntryClasses(type);
    } else {
      return this.fakeService.loadEntryClasses(type);
    }
  }

  public saveEntryClass(entryClass: EntryClass): Observable<EntryClass> {
    if (this.isOnline()) {
      return this.expenseService.saveEntryClass(entryClass);
    } else {
      return this.fakeService.saveEntryClass(entryClass);
    }
  }

  public deleteEntryClass(id: number): Observable<EntryClass> {
    if (this.isOnline()) {
      return this.expenseService.deleteEntryClass(id);
    } else {
      return this.fakeService.deleteEntryClass(id);
    }
  }

  public deleteEntry(id: number): Observable<Entry> {
    if (this.isOnline()) {
      return this.expenseService.deleteEntry(id);
    } else {
      return this.fakeService.deleteEntry(id);
    }
  }

  checkUsernameAvailability(login: string) {
    if (this.isOnline()) {
      return this.authenticationService.checkUsernameAvailability(login);
    } else {
      return this.fakeService.checkUsernameAvailability(login);
    }
  }

  public createUser(credentials: SignupCredentials) {
    if (this.isOnline()) {
      return this.authenticationService.createUser(credentials);
    } else {
      return this.fakeService.createUser(credentials);
    }
  }
}

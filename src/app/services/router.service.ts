import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ExpenseService } from './expense.service';
import { FakeService } from './fake.service';
import { Entry } from '../entities/lancamento';
import { Observable } from 'rxjs';
import { EntryClass } from '../entities/categoria-lancamento';
import { SignupCredentials } from '../entities/signup-credentials';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private authenticationService: AuthenticationService,
              private expenseService: ExpenseService,
              private fakeService: FakeService,
              ) { }

  connectionMode = 'offline';

  public isOnline(): boolean {
    return localStorage.getItem('connectionMode') === 'online';
  }

  public connect(): void {
    localStorage.setItem('connectionMode', 'online');
  }

  public disconnect(): void {
    localStorage.setItem('connectionMode', 'offline');
  }

  public getCurrentUser() {
    if (this.isOnline()) {
      return this.authenticationService.currentUserValue;
    } else {
      return this.fakeService.currentUserValue;
    }
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


  setConnectionMode(isOfflineMode: boolean): void {
    if (isOfflineMode) {
      this.disconnect();
    } else {
      this.connect();
    }
  }

  clearConnectionMode(): void {
    localStorage.removeItem('connectionMode');
  }

  //
  login(username: string, password: string, isOfflineMode: boolean) {
    this.setConnectionMode(isOfflineMode);
    if (this.isOnline()) {
      return this.authenticationService.login(username, password);
    } else {
      return this.fakeService.login(username, password);
    }
  }

  logout() {
    if (this.isOnline()) {
      this.clearConnectionMode();
      return this.authenticationService.logout();
    } else {
      this.clearConnectionMode();
      return this.fakeService.logout();
    }
  }

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

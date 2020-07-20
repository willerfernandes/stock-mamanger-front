import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserAuth } from '../entities/user-auth';
import { EntryClass } from 'src/app/financial/entities/entry-class';
import { User } from '../entities/user';
import { SignupCredentials } from '../entities/signup-credentials';

@Injectable({
  providedIn: 'root'
})
export class OfflineAuthenticationService {

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(this.storageService.findUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }


private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;


  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserValue != null;
  }


  login(username: string, password: string): Observable<UserAuth> {
    let user = this.storageService.findUser();
    if (user == null) {
      user = this.storageService.findLastUser();
    }
    if (user == null) {
      this.generateMockedDefaultEntryClassesData();
      user = {
        id: 1,
        login: username,
        nome: 'Fake User',
        token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4' +
               'cCI6MTU5Mzg5MDUxOCwic2NvcGUiOiJleHBlbnNlLXJlc' +
               'G9ydDtsaXN0LWVudHJ5O3NhdmUtZW50cnk7ZGVsZXRlLWV' +
               'udHJ5O2xpc3QtZW50cnlDbGFzcztzYXZlLWVudHJ5Q2xhc' +
               '3M7ZGVsZXRlLWVudHJ5Q2xhc3MiLCJpc3MiOiJ3aWxsc29' +
               'mdCIsImlkIjoxLCJsb2dpbiI6ImFkbWluIiwibmFtZSI6I' +
               'kFkbWluaXN0cmF0b3IiLCJpYXQiOjE1OTM4ODY5MTgsImp' +
               '0aSI6IjA2YzU4ZDNhLTBmNDQtNDI5ZS1iMjUwLWJmYTM3M' +
               'zM1ZjY0MyJ9.I0oJxXkxi9Kih0RlVoNKdcwv9c49-FAnvv' +
               'GYl17E6E-Rku2J6uUPAx8r4xVnspt2k38aNr7Uq2QKMF8ieMRG0Q'
      };
    }

    this.storageService.saveCurrentUser(user);
    this.currentUserSubject.next(user);
    return of(user);
  }

  private generateMockedDefaultEntryClassesData(): void {
    const entryGroup1 = new EntryClass();
    entryGroup1.id = 1;
    entryGroup1.name = 'Alimentação';
    entryGroup1.description = 'Despesas com alimentação';
    entryGroup1.type = 'DESPESA';

    const entryGroup2 = new EntryClass();
    entryGroup2.id = 2;
    entryGroup2.name = 'Transporte';
    entryGroup2.description = 'Despesas com transporte';
    entryGroup2.type = 'DESPESA';

    const entryGroup3 = new EntryClass();
    entryGroup3.id = 3;
    entryGroup3.name = 'Lazer';
    entryGroup3.description = 'Despesas com lazer';
    entryGroup3.type = 'DESPESA';

    const entryGroup4 = new EntryClass();
    entryGroup4.id = 4;
    entryGroup4.name = 'Salário';
    entryGroup4.description = 'Recebimento do salário';
    entryGroup4.type = 'RECEITA';

    const allEntryClasses = [entryGroup1, entryGroup2, entryGroup3, entryGroup4];

    this.storageService.saveAllEntryClasses(allEntryClasses);

  }

  save(user): Observable<User> {
    return of(user);
  }

  public checkUsernameAvailability(login: string): boolean {
    return true;
  }

  public createUser(credentials: SignupCredentials): boolean {
    return true;
  }


  logout() {
    // remove user from local storage to log user out - do not remove user data to allow offline mode
    this.storageService.saveLastUser();
    this.storageService.deleteCurrentUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}

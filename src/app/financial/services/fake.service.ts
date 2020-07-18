import { Injectable, Optional } from '@angular/core';
import { Credentials } from '../../common/entities/credentials';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ExpenseReport } from '../entities/expense-report';
import { GraphInfo } from '../entities/graph-info';
import { EntryGroup } from '../entities/entry-group';
import { Entry } from '../entities/entry';
import { EntryClass } from '../entities/entry-class';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { UserAuth } from 'src/app/common/entities/user-auth';
import { User } from 'src/app/common/entities/user';
import { SignupCredentials } from 'src/app/common/entities/signup-credentials';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  public isFakeServer = false;

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

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    const allEntries: Entry[] = this.storageService.findAllEntries();
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();

    if (allEntries == null || allEntries.length === 0) {
      return of(null);
    }

    const filterStartDate: Date = new Date(startDate);
    const filterEndDate: Date = new Date(endDate);

    const entries = allEntries.filter(entry => new Date(entry.date) >= filterStartDate && new Date(entry.date) <= filterEndDate );

    if (entries == null || entries.length === 0) {
      return of(null);
    }

    const report: ExpenseReport = new ExpenseReport();
    const entryGroupExpenseList: EntryGroup[] = [];
    const entryGroupReceiptList: EntryGroup[] = [];

    let entryGroupId = 1;
    let totalValueExpenses = 0;
    let totalValueReceipt = 0;
    entryClasses.forEach(entryClass => {
      const entriesOfThisClass = entries.filter(entry => entry.entryClass.name === entryClass.name && entry.entryType === entryClass.type);
      if (entriesOfThisClass.length !== 0) {
        const newEntryGroup: EntryGroup = new EntryGroup();
        newEntryGroup.entries = entriesOfThisClass;
        newEntryGroup.entryClassName = entryClass.name;
        let totalGroupValue = 0;
        entriesOfThisClass.forEach(entryOfThiClass => {
          totalGroupValue += entryOfThiClass.value;
        });

        newEntryGroup.value = totalGroupValue;

        if (entryClass.type === 'DESPESA') {
          totalValueExpenses += totalGroupValue;
          entryGroupExpenseList.push(newEntryGroup);
        } else if (entryClass.type === 'RECEITA') {
          totalValueReceipt += totalGroupValue;
          entryGroupReceiptList.push(newEntryGroup);
        }


        entryGroupId++;
      }
    });

    const graphInfoNames: string[] = [];
    const graphInfoValues: number[] = [];
    entryGroupExpenseList.forEach(entryGroup => {
      entryGroup.percentage = entryGroup.value / totalValueExpenses;
      graphInfoNames.push(entryGroup.entryClassName);
      graphInfoValues.push(entryGroup.value);
    });

    report.expenseGroups = entryGroupExpenseList;
    report.receiptGroups = entryGroupReceiptList;
    report.totalExpenseAmount = totalValueExpenses;
    report.totalReceiptAmount = totalValueReceipt;
    report.graphInfo = new GraphInfo();
    report.graphInfo.itens = graphInfoNames;
    report.graphInfo.values = graphInfoValues;

    // --------- EMPTY EXPENSE REPORT ------------
    return of(report);
  }

  public saveEntry(entry: Entry): Observable<Entry> {
    let entries: Entry[] = this.storageService.findAllEntries();
    let entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();

    if (entries == null || entries.length === 0) {
      entries = [];
    }

    if (entryClasses == null || entryClasses.length === 0) {
      entryClasses = [];
    }

    entry.id = entries.length  + 1;

    // necessary when user creates a new entryClass and is multiple expenses
    if (entry.entryClass.name != null) {
        const existingCategory: EntryClass =  entryClasses.find(entryClass => entryClass.name === entry.entryClass.name);
        if (existingCategory != null) {
          entry.entryClass = existingCategory;
        }
    }

    if (entry.entryClass.id == null) {
      const newEntryClass = new EntryClass();
      newEntryClass.id = entryClasses.length + 1;
      newEntryClass.name = entry.entryClass.name;
      newEntryClass.description = entry.entryClass.description;
      newEntryClass.type = entry.entryClass.type;

      entry.entryClass = newEntryClass;

      entryClasses.push(newEntryClass);
      this.storageService.saveAllEntryClasses(entryClasses);

    } else {
      const classWithEntryId = entryClasses.find(entryClass => entryClass.id === entry.entryClass.id);
      entry.entryClass = classWithEntryId;
    }

    entries.push(entry);
    this.storageService.saveAllEntries(entries);
    return of(entry);
  }

  public deleteEntry(id: number): Observable<Entry> {
    const entries: Entry[] = this.storageService.findAllEntries();
    const toBeDeleted = entries.findIndex(entry => entry.id === id);
    const deleted = entries.splice(toBeDeleted, 1);
    this.storageService.saveAllEntries(entries);
    return of(deleted[0]);
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();
    if (entryClasses == null) {
      return of(null);
    }
    if (type == null) {
      return of(entryClasses);
    } else {
      return of(entryClasses.filter(entryClass => entryClass.type === type));
    }
  }

  public loadEntryClass(id: number) {
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();
    return of(entryClasses.find(entryClass => entryClass.id === id));
  }

  deleteEntryClass(id: number) {
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();
    const oldEntryClassIndex: number = entryClasses.findIndex(entryClass => entryClass.id === id);
    entryClasses.splice(oldEntryClassIndex, 1);
    this.storageService.saveAllEntryClasses(entryClasses);

    // delete ALL entries with this class
    const entries: Entry[] = this.storageService.findAllEntries();

    const entriesWithoutThisClass = [];

    let index = 0;
    entries.forEach(entry => {
      if (entry.entryClass.id !== id) {
        entriesWithoutThisClass.push(entry);
      }
      index++;
    });

    this.storageService.saveAllEntries(entriesWithoutThisClass);
    return of(null);
  }

  saveEntryClass(newEntryClass: EntryClass) {
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();
    const indexOldEntryClass: number =  entryClasses.findIndex(oldClass => oldClass.id === newEntryClass.id);
    if (indexOldEntryClass === -1) /*new class*/ {
      newEntryClass.id = entryClasses.length;
      entryClasses.push(newEntryClass);
    } else {
      entryClasses.splice(indexOldEntryClass, 1, newEntryClass);
    }
    this.storageService.saveAllEntryClasses(entryClasses);

    //update ALL entries with this class
    const entries: Entry[] = this.storageService.findAllEntries();

    entries.forEach(entry => {
      if (entry.entryClass.id === newEntryClass.id) {
        entry.entryClass = newEntryClass;
      }
    });

    this.storageService.saveAllEntries(entries);

    return of(newEntryClass);
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


  // Adm
  updateEntriesOnStorage(entriesJson: string) {
    this.storageService.saveAllEntries(JSON.parse(entriesJson));
  }

  updateEntryClassesOnStorage(entryClasses: string) {
    this.storageService.saveAllEntryClasses(JSON.parse(entryClasses));
  }

  loadEntriesFromStorage(): Observable<string> {
    return of(JSON.stringify(this.storageService.findAllEntries()));
  }

  loadEntryClassesFromStorage(): Observable<string>  {
    return of(JSON.stringify(this.storageService.findAllEntryClasses()));
  }

  clearStorage() {
    this.storageService.delleteAllStorage();
  }

}

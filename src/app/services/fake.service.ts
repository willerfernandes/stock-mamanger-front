import { Injectable, Optional } from '@angular/core';
import { Credentials } from '../entities/credentials';
import { UserAuth } from '../entities/user-auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ExpenseReport } from '../entities/expense-report';
import { GraphInfo } from '../entities/item-grafico';
import { EntryGroup } from '../entities/grupo-lancamento';
import { Entry } from '../entities/lancamento';
import { User } from '../entities/user';
import { EntryClass } from '../entities/categoria-lancamento';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  public isFakeServer = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('currentUser')));
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
    // ao remover o fake service, remover também do auth guard
    const user: UserAuth = {
      id: 1,
      login: username,
      nome: 'Fake User',
      token: '9123jhasdjaqs812318dajsd8q1j219e3j121234=çfasd.1//a~]-=dlaspiodmjapismda9da89ujd9q'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    this.generateMockedDefaultEntryClassesData();

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

    const allEntries = [entryGroup1, entryGroup2, entryGroup3, entryGroup4];

    localStorage.setItem('entryClasses', JSON.stringify(allEntries));

  }

  save(user): Observable<User> {
    return of(user);
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    const allEntries: Entry[] = this.getEntriesFromStorage();
    const entryClasses: EntryClass[] = this.getEntryClassesFromStorage();

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
      const entriesOfThisClass = entries.filter(entry => entry.entryClass.name === entryClass.name);
      if (entriesOfThisClass.length !== 0) {
        const newEntryGroup: EntryGroup = new EntryGroup();
        newEntryGroup.entries = entriesOfThisClass;
        newEntryGroup.entryClassName = entryClass.name;
        let totalGroupValue = 0;
        entriesOfThisClass.forEach(entryOfThiClass => {
          totalGroupValue += entryOfThiClass.value;
        });

        newEntryGroup.value = totalGroupValue;
        newEntryGroup.id = entryGroupId;

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
    let entries: Entry[] = this.getEntriesFromStorage();
    let entryClasses: EntryClass[] = this.getEntryClassesFromStorage();

    if (entries == null || entries.length === 0) {
      entries = [];
    }

    entry.id = entries.length  + 1;

    // necessary when user creastes a new entryClass and is multiple expenses
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

      if (entryClasses == null || entryClasses.length === 0) {
        entryClasses = [];
      }

      entryClasses.push(newEntryClass);
      this.setEntryClassesOnStorage(entryClasses);

    } else {
      const classWithEntryId = entryClasses.find(entryClass => entryClass.id === entry.entryClass.id);
      entry.entryClass = classWithEntryId;
    }

    entries.push(entry);
    this.setEntriesOnStorage(entries);
    return of(entry);
  }

  public deleteEntry(id: number): Observable<Entry> {
    const entries: Entry[] = this.getEntriesFromStorage();
    const toBeDeleted = entries.findIndex(entry => entry.id === id);
    const deleted = entries.splice(toBeDeleted, 1);
    this.setEntriesOnStorage(entries);
    return of(deleted[0]);
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    const entryClasses: EntryClass[] = this.getEntryClassesFromStorage();
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
    const entryClasses: EntryClass[] = this.getEntryClassesFromStorage();
    return of(entryClasses.find(entryClass => entryClass.id === id));
  }

  deleteEntryClass(id: number) {
    const entryClasses: EntryClass[] = this.getEntryClassesFromStorage();
    const oldEntryClassIndex: number = entryClasses.findIndex(entryClass => entryClass.id === id);
    entryClasses.splice(oldEntryClassIndex, 1);
    this.setEntryClassesOnStorage(entryClasses);

    //delete ALL entries with this class
    const entries: Entry[] = this.getEntriesFromStorage();

    const entriesWithoutThisClass = [];

    let index = 0;
    entries.forEach(entry => {
      if (entry.entryClass.id !== id) {
        entriesWithoutThisClass.push(entry);
      }
      index++;
    });

    this.setEntriesOnStorage(entriesWithoutThisClass);
    return of(null);
  }

  saveEntryClass(newEntryClass: EntryClass) {
    const entryClasses: EntryClass[] = this.getEntryClassesFromStorage();
    const indexOldEntryClass: number =  entryClasses.findIndex(oldClass => oldClass.id === newEntryClass.id);
    if (indexOldEntryClass === -1) /*new class*/ {
      newEntryClass.id = entryClasses.length;
      entryClasses.push(newEntryClass);
    } else {
      entryClasses.splice(indexOldEntryClass, 1, newEntryClass);
    }
    this.setEntryClassesOnStorage(entryClasses);

    //update ALL entries with this class
    const entries: Entry[] = this.getEntriesFromStorage();

    entries.forEach(entry => {
      if (entry.entryClass.id === newEntryClass.id) {
        entry.entryClass = newEntryClass;
      }
    });

    this.setEntriesOnStorage(entries);

  }

  private getEntryClassesFromStorage(): EntryClass[] {
    return JSON.parse(localStorage.getItem('entryClasses'));
  }

  private getEntriesFromStorage(): Entry[] {
    return JSON.parse(localStorage.getItem('entries'));
  }

  private setEntryClassesOnStorage(entryClasses: EntryClass[]) {
    localStorage.setItem('entryClasses', JSON.stringify(entryClasses));
  }

  private setEntriesOnStorage(entries: Entry[]) {
    localStorage.setItem('entries', JSON.stringify(entries));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('entryClasses');
    localStorage.removeItem('entries');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateEntriesOnStorage(entriesJson: string) {
    localStorage.setItem('entries', entriesJson);
  }

  updateEntryClassesOnStorage(entryClasses: string) {
    localStorage.setItem('entryClasses', entryClasses);
  }

  loadEntriesFromStorage(): Observable<string> {
    return of(localStorage.getItem('entries'));
  }

  loadEntryClassesFromStorage(): Observable<string>  {
    return of(localStorage.getItem('entryClasses'));
  }

  clearStorage() {
    localStorage.clear();
  }

}

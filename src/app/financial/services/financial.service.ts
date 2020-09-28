import { Injectable } from '@angular/core';
import { Entry } from '../entities/entry';
import { Observable, of } from 'rxjs';
import { EntryClass } from '../entities/entry-class';
import { OnlineFinancialService } from './online-financial.service';
import { OfflineFinancialService } from './offline-financial.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { StorageService } from '../../common/services/storage.service';
import { MessageService } from '../../common/services/message.service';
import { FormGroup } from '@angular/forms';
import { RecurrentEntry } from '../entities/recurrent-entry';
import { ExpenseReport } from '../entities/expense-report';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(private onlineFinancialService: OnlineFinancialService,
              private offlineFinancialService: OfflineFinancialService,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private storageService: StorageService) { }


  public isOnline(): boolean {
    return this.authenticationService.isOnline();
  }

  loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    if (this.authenticationService.isOnline()) {
      return this.onlineFinancialService.loadExpenseReport(startDate, endDate);
    } else {
      return this.offlineFinancialService.loadExpenseReport(startDate, endDate);
    }
  }

  saveEntry(value: string,
            entryClassId: string,
            newEntryClassName: string,
            newEntryClassDescription: string,
            description: string,
            date: any,
            installmentPurchase: boolean,
            numberOfPlots: number,
            entryType: string) {

    const newEntries: Entry[] = this.createEntries(value,
      entryClassId, newEntryClassName, newEntryClassDescription, description,
      date, installmentPurchase, numberOfPlots, entryType);


    if (this.isOnline()) {
      return this.onlineFinancialService.saveEntries(newEntries);
    } else {
      return this.offlineFinancialService.saveEntries(newEntries);
    }
  }

saveRecurrentEntry( value: string,
                    entryClassId: string,
                    newEntryClassName: string,
                    newEntryClassDescription: string,
                    description: string,
                    date: any,
                    recurrentDate: any,
                    entryType: string): Observable<RecurrentEntry> {

    const newRecurrentEntry: RecurrentEntry = this.createRecurrentEntry(value,
    entryClassId, newEntryClassName, newEntryClassDescription, description,
    date, recurrentDate, entryType);

    if (this.isOnline()) {
      return this.onlineFinancialService.saveRecurrentEntry(newRecurrentEntry);
    } else {
      return this.offlineFinancialService.saveRecurrentEntry(newRecurrentEntry);
    }
}

  createEntries(value: string,
                entryClassId: string,
                newEntryClassName: string,
                newEntryClassDescription: string,
                description: string,
                date: any,
                installmentPurchase: boolean,
                numberOfPlots: number,
                entryClassType: string): Entry[] {

    let entriesToBeCreated: Entry[] = [];

    const entryClass = new EntryClass();
    if (entryClassId === 'new') {
      entryClass.userId = this.authenticationService.getCurrentUser().id;
      entryClass.name = newEntryClassName;
      entryClass.description = newEntryClassDescription;
      entryClass.type = entryClassType;
    } else {
      entryClass.id = Number.parseInt(entryClassId, 10);
    }

    if (installmentPurchase) {
      const entries = this.createInstallmentPurchases(value, numberOfPlots, date, entryClass, description);
      entriesToBeCreated = entriesToBeCreated.concat(entries);
    } else {
      const entry = new Entry();
      entry.userId = this.authenticationService.getCurrentUser().id;
      entry.entryClass = entryClass;
      entry.date = date.toISOString();
      entry.description = description;
      entry.entryType = entryClassType;
      entry.value = Number.parseFloat(value);
      entriesToBeCreated.push(entry);
    }

    return entriesToBeCreated;

  }


  createRecurrentEntry(   value: string,
                          entryClassId: string,
                          newEntryClassName: string,
                          newEntryClassDescription: string,
                          description: string,
                          date: any,
                          maxDate: Date,
                          entryClassType: string): RecurrentEntry {

    const entryClass = new EntryClass();
    if (entryClassId === 'new') {
    entryClass.userId = this.authenticationService.getCurrentUser().id;
    entryClass.name = newEntryClassName;
    entryClass.description = newEntryClassDescription;
    entryClass.type = entryClassType;
    } else {
    entryClass.id = Number.parseInt(entryClassId, 10);
    }

    const recurrentEntry = new RecurrentEntry();
    recurrentEntry.userId = this.authenticationService.getCurrentUser().id;
    recurrentEntry.entryClass = entryClass;
    recurrentEntry.dueDate = date;
    recurrentEntry.maxDate = maxDate;
    recurrentEntry.creationDate = new Date();
    recurrentEntry.description = description;
    recurrentEntry.entryType = entryClassType;
    recurrentEntry.value = Number.parseFloat(value);

    return recurrentEntry;

}

  private createInstallmentPurchases( value: string,
                                      numberOfPlots: number,
                                      date: any,
                                      entryGroup: EntryClass,
                                      description: string): Entry[] {

    const eachPlotValue: number = parseFloat(value) / numberOfPlots;
    const initialDate: Date = new Date(date.toISOString());
    const entriesToBeCreated = [];
    for (let i = 0; i < numberOfPlots; i++) {
      const entry = new Entry();
      entry.userId = this.authenticationService.getCurrentUser().id;
      entry.entryClass = entryGroup;
      entry.date = new Date(initialDate.getFullYear(), initialDate.getMonth() + i, initialDate.getDate()).toISOString();
      entry.description = description + ' ' + '(' + (i + 1) + '/' + numberOfPlots + ')';
      entry.entryType = 'DESPESA';
      entry.value = eachPlotValue;
      entriesToBeCreated.push(entry);
    }

    return entriesToBeCreated;
  }

  public loadEntryClass(id: number): Observable<EntryClass> {
    if (this.isOnline()) {
      return this.onlineFinancialService.loadEntryClass(id);
    } else {
      return this.offlineFinancialService.loadEntryClass(id);
    }
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    if (this.isOnline()) {
      return this.onlineFinancialService.loadEntryClasses(type);
    } else {
      return this.offlineFinancialService.loadEntryClasses(type);
    }
  }

  public saveEntryClass(entryClass: EntryClass): Observable<EntryClass> {
    if (this.isOnline()) {
      return this.onlineFinancialService.saveEntryClass(entryClass);
    } else {
      return this.offlineFinancialService.saveEntryClass(entryClass);
    }
  }

  public deleteEntryClass(id: number): Observable<EntryClass> {
    if (this.isOnline()) {
      return this.onlineFinancialService.deleteEntryClass(id);
    } else {
      return this.offlineFinancialService.deleteEntryClass(id);
    }
  }

  public deleteEntry(id: number): Observable<Entry> {
    if (this.isOnline()) {
      return this.onlineFinancialService.deleteEntry(id);
    } else {
      return this.offlineFinancialService.deleteEntry(id);
    }
  }

  public async sync(isLogin: boolean) {
    const entries = this.storageService.findAllEntries();
    this.messageService.openMessageBar('Sincronizando dados da sua sessão... Isso poderá levar alguns segundos.', null);
    this.onlineFinancialService.syncEntries(entries).subscribe(entriesOnDatabase => {
      if (isLogin) {
        if (entriesOnDatabase.status === 200) {
          this.storageService.saveAllEntries(entriesOnDatabase.body);
          this.messageService.openMessageBar('Seus novos lançamentos foram sincronizados com o servidor' +
            ' Atualize para exibir os dados mais recentes.', null);
        }
      } else {
        if (entriesOnDatabase.status === 204) {
          this.messageService.openMessageBar('Você está online novamente!', null);
        }
        if (entriesOnDatabase.status === 200) {
          this.storageService.saveAllEntries(entriesOnDatabase.body);
          this.messageService.openMessageBar('Você está online novamente! ' +
            'Seus novos lançamentos foram sincronizados com o servidor.', null);
          this.storageService.saveAllEntries(entriesOnDatabase.body);
        }
      }
      if (entriesOnDatabase.status === 200) {
        if (isLogin) {
          this.messageService.openMessageBar('Você está online novamente! ' +
            'Seus novos lançamentos foram sincronizados com o servidor.', null);
          return;
        }
      }
    },
      err => {
        this.messageService.openMessageBar('Sua sessão expirou. Por favor, faça login novamente', null);
      });
  }

  updateLocalStorageFromDatabase(): void {
    try {
      if (this.isOnline()) {
        this.onlineFinancialService.loadEntryClasses('').subscribe(clases => {
          this.storageService.saveAllEntryClasses(clases);
        });
        this.onlineFinancialService.loadAllEntries().subscribe(entries => {
          this.storageService.saveAllEntries(entries);
        });
        this.onlineFinancialService.loadAllRecurrentEntries().subscribe(recurrentEntries => {
          this.storageService.saveAllRecurrentEntries(recurrentEntries);
        });
      }
    } catch (error) {
      console.log('Error while sincronizing with database');
    }
  }

  // Adm
  updateEntriesOnStorage(entriesJson: string) {
    this.storageService.saveAllEntries(JSON.parse(entriesJson));
  }

  updateEntryClassesOnStorage(entryClasses: string) {
    this.storageService.saveAllEntryClasses(JSON.parse(entryClasses));
  }

  updateRecurrentEntryClassesOnStorage(recurrentEntries: string) {
    this.storageService.saveAllRecurrentEntries(JSON.parse(recurrentEntries));
  }

  loadEntriesFromStorage(): Observable<string> {
    return of(JSON.stringify(this.storageService.findAllEntries()));
  }

  loadEntryClassesFromStorage(): Observable<string> {
    return of(JSON.stringify(this.storageService.findAllEntryClasses()));
  }

  loadRecurrentEntriesFromStorage(): Observable<string> {
    return of(JSON.stringify(this.storageService.findAllRecurrentEntries()));
  }

  clearStorage() {
    this.storageService.delleteAllStorage();
  }

}

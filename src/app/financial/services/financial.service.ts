import { Injectable } from '@angular/core';
import { Entry } from '../entities/entry';
import { Observable, of } from 'rxjs';
import { EntryClass } from '../entities/entry-class';
import { OnlineFinancialService } from './online-financial.service';
import { OfflineFinancialService } from './offline-financial.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { StorageService } from '../../common/services/storage.service';
import { MessageService } from '../../common/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(private onlineFinancialService: OnlineFinancialService,
              private offlineFinancialService: OfflineFinancialService,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private storageService: StorageService) { }


  private isOnline(): boolean {
    return this.authenticationService.isOnline();
  }

  loadExpenseReport(startDate: string, endDate: string) {
    if (this.authenticationService.isOnline()) {
      return this.onlineFinancialService.loadExpenseReport(startDate, endDate);
    } else {
      return this.offlineFinancialService.loadExpenseReport(startDate, endDate);
    }
  }

  saveEntry(entry: Entry) {
    if (this.isOnline) {
      return this.onlineFinancialService.saveEntry(entry);
    } else {
      return this.offlineFinancialService.saveEntry(entry);
    }
  }

  public loadEntryClass(id: number): Observable<EntryClass> {
    if (this.isOnline) {
      return this.onlineFinancialService.loadEntryClass(id);
    } else {
      return this.offlineFinancialService.loadEntryClass(id);
    }
  }

  public loadEntryClasses(type: string): Observable<EntryClass[]> {
    if (this.isOnline) {
      return this.onlineFinancialService.loadEntryClasses(type);
    } else {
      return this.offlineFinancialService.loadEntryClasses(type);
    }
  }

  public saveEntryClass(entryClass: EntryClass): Observable<EntryClass> {
    if (this.isOnline) {
      return this.onlineFinancialService.saveEntryClass(entryClass);
    } else {
      return this.offlineFinancialService.saveEntryClass(entryClass);
    }
  }

  public deleteEntryClass(id: number): Observable<EntryClass> {
    if (this.isOnline) {
      return this.onlineFinancialService.deleteEntryClass(id);
    } else {
      return this.offlineFinancialService.deleteEntryClass(id);
    }
  }

  public deleteEntry(id: number): Observable<Entry> {
    if (this.isOnline) {
      return this.onlineFinancialService.deleteEntry(id);
    } else {
      return this.offlineFinancialService.deleteEntry(id);
    }
  }

  public sync() {
    const entries = this.storageService.findAllEntries();
    this.onlineFinancialService.syncEntries(entries).subscribe(entriesOnDatabase => {
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

  updateLocalStorageFromDatabase(): void {
    try {
      if (this.isOnline) {
        this.onlineFinancialService.loadEntryClasses('').subscribe(clases => {
          this.storageService.saveAllEntryClasses(clases);
        });
        this.onlineFinancialService.loadAllEntries().subscribe(entries => {
          this.storageService.saveAllEntries(entries);
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

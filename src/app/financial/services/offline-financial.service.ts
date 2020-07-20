import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExpenseReport } from '../entities/expense-report';
import { Entry } from '../entities/entry';
import { EntryClass } from '../entities/entry-class';
import { EntryGroup } from '../entities/entry-group';
import { GraphInfo } from '../entities/graph-info';
import { StorageService } from '../../common/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineFinancialService {

  constructor(private storageService: StorageService) { }

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
    this.storageService.setIsDirty(true);
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
    this.storageService.setIsDirty(true);
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
    this.storageService.setIsDirty(true);
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
    this.storageService.setIsDirty(true);
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();
    const indexOldEntryClass: number =  entryClasses.findIndex(oldClass => oldClass.id === newEntryClass.id);
    if (indexOldEntryClass === -1) /*new class*/ {
      newEntryClass.id = entryClasses.length;
      entryClasses.push(newEntryClass);
    } else {
      entryClasses.splice(indexOldEntryClass, 1, newEntryClass);
    }
    this.storageService.saveAllEntryClasses(entryClasses);

    // update ALL entries with this class
    const entries: Entry[] = this.storageService.findAllEntries();

    entries.forEach(entry => {
      if (entry.entryClass.id === newEntryClass.id) {
        entry.entryClass = newEntryClass;
      }
    });

    this.storageService.saveAllEntries(entries);

    return of(newEntryClass);
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

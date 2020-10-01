import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExpenseReport } from '../entities/expense-report';
import { Entry } from '../entities/entry';
import { EntryClass } from '../entities/entry-class';
import { EntryGroup } from '../entities/entry-group';
import { GraphInfo } from '../entities/graph-info';
import { StorageService } from '../../common/services/storage.service';
import { RecurrentEntry } from '../entities/recurrent-entry';
import { RecurrentEntryGroup } from '../entities/recurrent-entry-group';

@Injectable({
  providedIn: 'root'
})
export class OfflineFinancialService {

  constructor(private storageService: StorageService) { }

  loadExpenseReport(startDate: Date, endDate: Date): Observable<ExpenseReport> {
    const allEntries: Entry[] = this.storageService.findAllEntries();
    const entryClasses: EntryClass[] = this.storageService.findAllEntryClasses();

    if (allEntries == null || allEntries.length === 0) {
      return of(null);
    }

    startDate.setHours(0, 0, 0);
    endDate.setHours(23, 59, 59);

    const entries = allEntries.filter(entry => {
      return new Date(entry.date) >= startDate && new Date(entry.date) <= endDate;
    });

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


    const recurrentEntries = this.getRecurrentEntriesInfo();

    report.expenseGroups = entryGroupExpenseList;
    report.receiptGroups = entryGroupReceiptList;
    report.recurrentEntryGroups = recurrentEntries;
    report.totalExpenseAmount = totalValueExpenses;
    report.totalReceiptAmount = totalValueReceipt;
    report.graphInfo = new GraphInfo();
    report.graphInfo.itens = graphInfoNames;
    report.graphInfo.values = graphInfoValues;

    // --------- EMPTY EXPENSE REPORT ------------
    return of(report);
  }

  private getRecurrentEntriesInfo(): RecurrentEntryGroup[] {
    const allEntries: Entry[] = this.storageService.findAllEntries();
    let allRecurrentEntries: RecurrentEntry[] = this.storageService.findAllRecurrentEntries();
    const recurrentEntryGroups: RecurrentEntryGroup[] = [];

    if (allRecurrentEntries == null) {
      allRecurrentEntries = [];
    }

    for (const recurrentEntry of allRecurrentEntries) {
      const recurrentEntryGroup = new RecurrentEntryGroup();
      recurrentEntryGroup.recurrentEntry = recurrentEntry;
      recurrentEntryGroup.associatedEntries = allEntries.filter(entry => entry.recurrentEntryId === recurrentEntry.id);
      recurrentEntryGroup.isCheckedForThisPeriod = this.
        getIsCheckedForPeriod(recurrentEntryGroup.associatedEntries, recurrentEntry.dueDate);
      recurrentEntryGroups.push(recurrentEntryGroup);
    }

    return recurrentEntryGroups;
  }

  private getIsCheckedForPeriod(associatedEntries: Entry[], dueDate: Date): boolean {
    for (const entry of associatedEntries) {
      const entryMonthNumber = new Date(entry.date).getMonth();
      const recurrentEntryMonthNumber = new Date(dueDate).getMonth();
      if ( entryMonthNumber === recurrentEntryMonthNumber) {
        return true;
      }
    }
    return false;
  }

  public saveEntries(entries: Entry[]): Observable<Entry[]> {
    const createdEntries: Entry[] = [];
    for ( const entry of entries) {
      createdEntries.push(this.saveEntry(entry));
    }
    return of(createdEntries);
  }

  public saveEntry(entry: Entry): Entry {
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
    return entry;
  }

  public deleteEntry(id: number): Observable<Entry> {
    this.storageService.setIsDirty(true);
    const entries: Entry[] = this.storageService.findAllEntries();
    const toBeDeleted = entries.findIndex(entry => entry.id === id);
    const deleted = entries.splice(toBeDeleted, 1);
    this.storageService.saveAllEntries(entries);
    return of(deleted[0]);
  }

  public deleteRecurrentEntry(id: number): Observable<RecurrentEntry> {
    this.storageService.setIsDirty(true);
    const entries: RecurrentEntry[] = this.storageService.findAllRecurrentEntries();
    const toBeDeleted = entries.findIndex(entry => entry.id === id);
    const deleted = entries.splice(toBeDeleted, 1);
    this.storageService.saveAllRecurrentEntries(entries);
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

  public loadRecurrentEntries(): Observable<RecurrentEntry[]> {
    const recurrentEntries: RecurrentEntry[] = this.storageService.findAllRecurrentEntries();
    if (recurrentEntries == null) {
      return of(null);
    }

    return of(recurrentEntries);
  }

  public loadRecurrentEntry(id: number) {
    const recurrentEntries: RecurrentEntry[] = this.storageService.findAllRecurrentEntries();
    return of(recurrentEntries.find(recurrentEntry => recurrentEntry.id === id));
  }

  public loadRecurrentEntryGroup(id: number) {
    const recurrentEntriesGroups = this.getRecurrentEntriesInfo();
    return of(recurrentEntriesGroups.find(recurrentEntryGroup => recurrentEntryGroup.recurrentEntry.id === id));
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


  saveRecurrentEntry(entry: RecurrentEntry): Observable<RecurrentEntry> {
    this.storageService.setIsDirty(true);
    let entries: RecurrentEntry[] = this.storageService.findAllRecurrentEntries();
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
    this.storageService.saveAllRecurrentEntries(entries);
    return of(entry);
}


updateRecurrentEntry(entry: RecurrentEntry): Observable<RecurrentEntry> {
  const allEntries: RecurrentEntry[] = this.storageService.findAllRecurrentEntries();
  const indexOldEntry: number =  allEntries.findIndex(oldEntry => oldEntry.id === entry.id);
  if (indexOldEntry === -1) /*not found*/ {
    entry.id = allEntries.length;
    allEntries.push(entry);
  } else {
    allEntries.splice(indexOldEntry, 1, entry);
  }
  this.storageService.saveAllRecurrentEntries(allEntries);
  return of(entry);
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

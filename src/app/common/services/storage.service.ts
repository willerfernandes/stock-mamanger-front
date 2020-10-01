import { Injectable } from '@angular/core';
import { Entry } from '../../financial/entities/entry';
import { EntryClass } from '../../financial/entities/entry-class';
import { UserAuth } from 'src/app/common/entities/user-auth';
import { RecurrentEntry } from 'src/app/financial/entities/recurrent-entry';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getConnectionMode(): string {
    return   localStorage.getItem('connectionMode');
  }

  public saveConnectionMode(connectionMode: string): void {
    localStorage.setItem('connectionMode', connectionMode);
  }

  public deleteConnectionMode(): void {
    localStorage.removeItem('connectionMode');
  }

  public findUser(): UserAuth {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public saveCurrentUser(user: UserAuth): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public deleteCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  public findLastUser(): UserAuth {
    return JSON.parse(localStorage.getItem('lastUser'));
  }

  public saveLastUser(): void {
    localStorage.setItem('lastUser', JSON.stringify(this.findUser()));
  }

  public findAllEntries(): Entry[] {
    return JSON.parse(localStorage.getItem('entries'));
  }

  public findAllEntryClasses(): EntryClass[] {
    return JSON.parse(localStorage.getItem('entryClasses'));
  }

  public saveAllEntryClasses(entryClasses: EntryClass[]) {
    localStorage.setItem('entryClasses', JSON.stringify(entryClasses));
  }

  public saveAllEntries(entries: Entry[]) {
    localStorage.setItem('entries', JSON.stringify(entries));
  }

  public clearEntries(): void {
    localStorage.removeItem('entries');
  }

  public clearEntryClasses(): void {
    localStorage.removeItem('entryClasses');
  }

  public clearRecurrentEntries(): void {
    localStorage.removeItem('recurrentEntries');
  }

  findAllRecurrentEntries(): RecurrentEntry[] {
    return JSON.parse(localStorage.getItem('recurrentEntries'));
  }

  public saveAllRecurrentEntries(entryClasses: RecurrentEntry[]) {
    localStorage.setItem('recurrentEntries', JSON.stringify(entryClasses));
  }

  public setIsDirty(isDirty: boolean): void {
    localStorage.setItem('isDirty', JSON.stringify(isDirty));
  }

  public isDirty(): boolean {
    return localStorage.getItem('isDirty') === 'true';
  }

  // DANGER ZONE
  public delleteAllStorage() {
    localStorage.clear();
  }

}

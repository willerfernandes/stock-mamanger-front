import { Injectable } from '@angular/core';
import { UserAuth } from '../entities/user-auth';
import { Entry } from '../entities/entry';
import { EntryClass } from '../entities/entry-class';

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

  // DANGER ZONE
  public delleteAllStorage() {
    localStorage.clear();
  }

}

import { EntryClass as EntryClass } from './entry-class';

export class RecurrentEntry {
  id: number;
  userId: number;
  entryType: string;
  entryClass: EntryClass;
  value: number;
  creationDate: Date;
  dueDate: Date;
  maxDate: Date;
  description: string;
}

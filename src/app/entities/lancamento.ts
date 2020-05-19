import { EntryClass as EntryClass } from './categoria-lancamento';

export class Entry {
  id: number;
  userId: number;
  entryType: string;
  entryClass: EntryClass;
  value: number;
  date: string;
  description: string;
}

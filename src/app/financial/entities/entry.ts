import { EntryClass as EntryClass } from './entry-class';

export class Entry {
  id: number;
  userId: number;
  recurrentEntryId?: number;
  entryType: string;
  entryClass: EntryClass;
  value: number;
  date: string;
  description: string;
}

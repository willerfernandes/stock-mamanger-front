import { Entry } from './lancamento';

export class EntryGroup {
  id: number;
  entryClassName: string;
  entryType: string;
  value: number;
  percentage: number;
  entries: Entry[];
}

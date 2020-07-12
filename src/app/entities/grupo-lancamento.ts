import { Entry } from './lancamento';

export class EntryGroup {
  entryClassName: string;
  entryType: string;
  value: number;
  percentage: number;
  entries: Entry[];
}

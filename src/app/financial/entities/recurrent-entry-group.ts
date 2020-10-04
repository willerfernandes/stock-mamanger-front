import { RecurrentEntry } from './recurrent-entry';
import { Entry } from './entry';

export class RecurrentEntryGroup {
  recurrentEntry: RecurrentEntry;
  associatedEntries: Entry[];
  isCheckedForThisPeriod: boolean;
}

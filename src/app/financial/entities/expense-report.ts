import { GraphInfo as GraphInfo } from './graph-info';
import { EntryGroup as EntryGroup } from './entry-group';
import { RecurrentEntry } from './recurrent-entry';

export class ExpenseReport {
  totalExpenseAmount: number;
  totalReceiptAmount: number;
  graphInfo: GraphInfo;
  expenseGroups: EntryGroup[];
  receiptGroups: EntryGroup[];
  recurrentEntries: RecurrentEntry[];
}

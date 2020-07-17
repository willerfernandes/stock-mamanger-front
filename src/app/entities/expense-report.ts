import { GraphInfo as GraphInfo } from './graph-info';
import { EntryGroup as EntryGroup } from './entry-group';

export class ExpenseReport {
  totalExpenseAmount: number;
  totalReceiptAmount: number;
  graphInfo: GraphInfo;
  expenseGroups: EntryGroup[];
  receiptGroups: EntryGroup[];
}

import { GraphInfo as GraphInfo } from './item-grafico';
import { EntryGroup as EntryGroup } from './grupo-lancamento';

export class ExpenseReport {
  totalExpenseAmount: number;
  totalReceiptAmount: number;
  graphInfo: GraphInfo;
  expenseGroups: EntryGroup[];
  receiptGroups: EntryGroup[];
}

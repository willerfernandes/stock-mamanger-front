import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-row',
  templateUrl: './expense-row.component.html',
  styleUrls: ['./expense-row.component.css']
})
export class ExpenseRowComponent implements OnInit {

  @Input()
  public expenses: any[];

  @Output()
  deleteRowEvent = new EventEmitter();

  constructor(private expenseService: ExpenseService) { }

  deleteExpense(id: any) {
    this.expenseService.deleteEntry(id);
    this.deleteRowEvent.emit(id);
  }

  ngOnInit() {
  }

}

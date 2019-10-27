import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';

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

  constructor() { }

  delete_expense(id: any) {
    this.deleteRowEvent.emit(id);
  }

  ngOnInit() {
  }

}

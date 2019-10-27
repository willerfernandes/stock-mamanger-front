import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expense-group',
  templateUrl: './expense-group.component.html',
  styleUrls: ['./expense-group.component.css']
})
export class ExpenseGroupComponent implements OnInit {

  @Input()
  public expenseGroups: any[];

  @Output()
  public deleteRowEvent = new EventEmitter();

  constructor() { }

  onDelete(event: any) {
    this.deleteRowEvent.emit(event);
  }

  ngOnInit() {
  }

}

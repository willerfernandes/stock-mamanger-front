import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expense-table-title',
  templateUrl: './expense-table-title.component.html',
  styleUrls: ['./expense-table-title.component.css']
})
export class ExpenseTableTitleComponent implements OnInit {

  @Input()
  public title: string;

  constructor() { }

  ngOnInit() {
  }

}

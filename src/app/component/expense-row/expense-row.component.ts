import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(private authenticationService: AuthenticationService, private expenseService: ExpenseService) { }

  public deleteExpense(id: any) {
     this.expenseService.deleteEntry(id).subscribe( async () => {
      this.deleteRowEvent.emit();
    },
    err => {
      this.authenticationService.openDialog('Ops! Tivemos um erro ao excluir seu lançamento.', 3000);
    });
  }

  ngOnInit() {
  }

}

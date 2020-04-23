import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FakeService } from 'src/app/services/fake.service';
import { MessageService } from 'src/app/services/message.service';

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

  constructor(private authenticationService: AuthenticationService, private expenseService: ExpenseService,
              private fakeService: FakeService, private messageService: MessageService) { }

  public deleteExpense(id: any) {
     this.fakeService.deleteEntry(id).subscribe( async () => {
      this.deleteRowEvent.emit();
    },
    err => {
      this.messageService.openMessageBar('Ops! Tivemos um erro ao excluir seu lançamento.', 3000);
    });
  }

  ngOnInit() {
  }

}

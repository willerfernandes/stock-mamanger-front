import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { MessageService } from 'src/app/financial/services/message.service';
import { Entry } from '../../entities/entry';
import { FinancialService } from '../../services/financial.service';


@Component({
  selector: 'app-expense-row',
  templateUrl: './expense-row.component.html',
  styleUrls: ['./expense-row.component.css']
})
export class ExpenseRowComponent implements OnInit {

  @Input()
  public expenses: Entry[];

  @Output()
  deleteRowEvent = new EventEmitter();

  constructor(private financialService: FinancialService, private messageService: MessageService) { }

  public deleteExpense(id: any) {
     this.financialService.deleteEntry(id).subscribe( async () => {
      this.deleteRowEvent.emit();
    },
    err => {
      this.messageService.openMessageBar('Ops! Tivemos um erro ao excluir seu lançamento.', 3000);
    });
  }

  ngOnInit() {
  }

}

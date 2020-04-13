import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {CurrencyPipe} from '@angular/common';
import { ExpenseService } from 'src/app/services/expense.service';
import { FakeService } from 'src/app/services/fake.service';
import { Lancamento } from 'src/app/entities/lancamento';
import { CategoriaLancamento } from 'src/app/entities/categoria-lancamento';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-expense-view',
  templateUrl: './new-expense-view.component.html',
  styleUrls: ['./new-expense-view.component.css']
})
export class NewExpenseViewComponent implements OnInit {

  public date: Date;
  formattedAmount;
  amount;
  public allEntryGroups: CategoriaLancamento[];

  constructor(
    private authenticationService: AuthenticationService,
    private fakeService: FakeService,
    private expenseService: ExpenseService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private currencyPipe: CurrencyPipe) {}

    saveExpense(
      event: MouseEvent,
      entryGroupId: number,
      date: any,
      description: string,
      value: number): void {

    const entryGroup = new CategoriaLancamento();
    entryGroup.id = entryGroupId;

    const entry = new Lancamento();
    entry.categoria = entryGroup;
    entry.data = date._selected.toISOString();
    entry.descricao = description;
    entry.tipo = 'DESPESA';
    entry.valor = value;

    console.log(entry);

    this.bottomSheetRef.dismiss();
    this.expenseService.saveEntry(entry).subscribe( res => {
      this.authenticationService.openDialog('Salvo com sucesso', 2000);
    },
    err => {
      this.authenticationService.openDialog('Ops! Tivemos um erro ao salvar seu lançamento.', 3000);
    });
    event.preventDefault();
  }

  transformAmount(element) {
    /*this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'BRL');

    element.target.value = this.formattedAmount;*/
  }

  private loadEntryGroups() {
    this.expenseService.loadEntryGroups().subscribe( res => {
      this.allEntryGroups = res;
    });
  }

  ngOnInit() {
    this.loadEntryGroups();
  }
}

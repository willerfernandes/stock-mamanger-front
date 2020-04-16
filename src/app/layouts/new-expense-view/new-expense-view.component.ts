import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CurrencyPipe } from '@angular/common';
import { ExpenseService } from 'src/app/services/expense.service';
import { FakeService } from 'src/app/services/fake.service';
import { Lancamento } from 'src/app/entities/lancamento';
import { CategoriaLancamento } from 'src/app/entities/categoria-lancamento';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-expense-view',
  templateUrl: './new-expense-view.component.html',
  styleUrls: ['./new-expense-view.component.css']
})
export class NewExpenseViewComponent implements OnInit {

  public isNewEntryGroup = false;
  public initialDate = new FormControl(new Date());
  public formattedAmount;
  public amount;
  public allEntryGroups: CategoriaLancamento[];

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private fakeService: FakeService,
    private expenseService: ExpenseService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private currencyPipe: CurrencyPipe) { }

  saveExpense(
    event: MouseEvent,
    entryGroupId: string,
    newEntryGroupName: any,
    newEntryGroupDescription: string,
    date: any,
    description: string,
    value: string): void {

    // TODO: validate with angular forms
    this.validateFields(entryGroupId, newEntryGroupName, newEntryGroupDescription, date, value);

    const entryGroup = new CategoriaLancamento();
    if (entryGroupId === 'new') {
      entryGroup.nome = newEntryGroupName;
      entryGroup.descricao = newEntryGroupDescription;
      entryGroup.tipo = 'DESPESA';
    } else {
      entryGroup.id = Number.parseInt(entryGroupId, 10);
    }

    const entry = new Lancamento();
    entry.categoria = entryGroup;
    entry.data = date._selected.toISOString();
    entry.descricao = description;
    entry.tipo = 'DESPESA';
    entry.valor = Number.parseFloat(value);
    this.bottomSheetRef.dismiss();
    this.fakeService.saveEntry(entry).subscribe(async res => {
      this.authenticationService.openDialog('Salvo com sucesso', 2000);
      this.entrySaved.emit();
    },
      err => {
        this.authenticationService.openDialog('Ops! Tivemos um erro ao salvar seu lançamento.', 3000);
      });
    event.preventDefault();
  }


  public validateFields(
    entryGroupId: string,
    newEntryGroupName: string,
    newEntryGroupDescription: string,
    date: any,
    value: string) {

    let isValidForm = true;

    if (entryGroupId === '---' || value == null || value === '' || date._selected == null) {
      isValidForm = false;
    }
    if (entryGroupId === 'new' &&
        (newEntryGroupName == null || newEntryGroupName === ''
        || newEntryGroupDescription == null || newEntryGroupDescription === '')) {

        isValidForm = false;
    }

    if (!isValidForm) {
      this.authenticationService.openDialog('Preencha todos os campos obrigatórios', 4000);
      throw new Error(('Campos obrigatórios não preenchidos'));
    }


  }

  transformAmount(element) {
    /*this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'BRL');

    element.target.value = this.formattedAmount;*/
  }

  public selectValueChanged(entryGroupSelect: any): void {
    this.isNewEntryGroup = entryGroupSelect.value === 'new';
  }

  public closeButtonClicked() {
    this.bottomSheetRef.dismiss();
  }

  private loadEntryGroups() {
    this.fakeService.loadEntryGroups('DESPESA').subscribe(res => {
      this.allEntryGroups = res;
    });
  }

  ngOnInit() {
    this.loadEntryGroups();
  }
}

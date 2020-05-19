import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CurrencyPipe } from '@angular/common';
import { ExpenseService } from 'src/app/services/expense.service';
import { FakeService } from 'src/app/services/fake.service';
import { Entry } from 'src/app/entities/lancamento';
import { EntryClass } from 'src/app/entities/categoria-lancamento';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-new-expense-view',
  templateUrl: './new-expense-view.component.html',
  styleUrls: ['./new-expense-view.component.css']
})
export class NewExpenseViewComponent implements OnInit {

  public isNewEntryGroup = false;
  public initialDate = new FormControl(new Date());
  public formattedAmount;
  public amount = '';
  public entryClasses: EntryClass[];
  public isDone = false;

  color: ThemePalette = 'primary';

  public isInstallmentPurchase = false;

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private fakeService: FakeService,
    private expenseService: ExpenseService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private currencyPipe: CurrencyPipe,
    private messageService: MessageService) { }
    plots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  saveExpense(
    event: MouseEvent,
    entryGroupId: string,
    newEntryGroupName: any,
    newEntryGroupDescription: string,
    date: any,
    description: string,
    value: string,
    numberOfPlots: number): void {

    // TODO: validate with angular forms
    this.validateFields(entryGroupId, newEntryGroupName, newEntryGroupDescription, date, value);

    const entryGroup = new EntryClass();
    if (entryGroupId === 'new') {
      entryGroup.name = newEntryGroupName;
      entryGroup.description = newEntryGroupDescription;
      entryGroup.type = 'DESPESA';
    } else {
      entryGroup.id = Number.parseInt(entryGroupId, 10);
    }

    if (this.isInstallmentPurchase) {
      this.createInstallmentPurchases(event, value, numberOfPlots, date, entryGroup, description);
    } else {
      const entry = new Entry();
      entry.entryClass = entryGroup;
      entry.date = date._selected.toISOString();
      entry.description = description;
      entry.entryType = 'DESPESA';
      entry.value = Number.parseFloat(value);
      this.bottomSheetRef.dismiss();
      this.expenseService.saveEntry(entry).subscribe(async res => {
        this.messageService.openMessageBar('Salvo com sucesso', 2000);
        this.entrySaved.emit();
      },
        err => {
          this.messageService.openMessageBar('Ops! Tivemos um erro ao salvar seu lançamento.', 3000);
        });
      event.preventDefault();
    }

  }

  private createInstallmentPurchases( event: MouseEvent,
                                      value: string,
                                      numberOfPlots: number,
                                      date: any,
                                      entryGroup: EntryClass,
                                      description: string) {

    const eachPlotValue: number = parseFloat(value) / numberOfPlots;
    const initialDate: Date = new Date(date._selected.toISOString());
    for (let i = 0; i < numberOfPlots; i++) {
      const entry = new Entry();
      entry.entryClass = entryGroup;
      entry.date = new Date(initialDate.getFullYear(), initialDate.getMonth() + i, initialDate.getDate()).toISOString();
      entry.description = description + ' ' + '(' + (i + 1) + '/' + numberOfPlots + ')';
      entry.entryType = 'DESPESA';
      entry.value = eachPlotValue;
      this.expenseService.saveEntry(entry).subscribe();
    }
    this.messageService.openMessageBar('Salvo com sucesso', 2000);
    this.entrySaved.emit();
    event.preventDefault();
    this.bottomSheetRef.dismiss();
  }

  public onIsInstallmentPurchaseToogleSliderChange(): void {
      this.isInstallmentPurchase = !this.isInstallmentPurchase;
  }

  public changedInputAmountValue(event: any) {
    /*const key = event.key;
    if (key === '.' || key === ',') {
      return;
    }
    const oldAmount = this.amount ;
    if (oldAmount.length === 0) {
      this.amount = ',0';
    }
    document.getElementById('input-currency').value = this.amount;
    // console.log(document.getElementById('input-currency').value );
    User key pressed still apears on input after the value set
    */
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
      this.messageService.openMessageBar('Preencha todos os campos obrigatórios', 4000);
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

  private loadEntryClasses() {
    this.expenseService.loadEntryClasses('DESPESA').subscribe( async (res) => {
      this.entryClasses = res;
      this.isDone = true;
    });
  }

  ngOnInit() {
    this.loadEntryClasses();
  }
}

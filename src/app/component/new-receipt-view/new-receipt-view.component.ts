import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EntryClass } from 'src/app/entities/categoria-lancamento';
import { MatBottomSheetRef } from '@angular/material';
import { NewExpenseViewComponent } from 'src/app/layouts/new-expense-view/new-expense-view.component';
import { CurrencyPipe } from '@angular/common';
import { Entry } from 'src/app/entities/lancamento';
import { MessageService } from 'src/app/services/message.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-new-receipt-view',
  templateUrl: './new-receipt-view.component.html',
  styleUrls: ['./new-receipt-view.component.css']
})
export class NewReceiptViewComponent implements OnInit {

  public isNewEntryGroup = false;
  public initialDate = new FormControl(new Date());
  public formattedAmount;
  public amount;
  public entryClasses: EntryClass[];

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private routerService: RouterService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private currencyPipe: CurrencyPipe,
    private messageService: MessageService) { }

  saveReceipt(
    event: MouseEvent,
    entryGroupId: string,
    newEntryGroupName: any,
    newEntryGroupDescription: string,
    date: any,
    description: string,
    value: string): void {

    // TODO: validate with angular forms
    this.validateFields(entryGroupId, newEntryGroupName, newEntryGroupDescription, date, value);

    const entryClass = new EntryClass();
    if (entryGroupId === 'new') {
      entryClass.userId = this.routerService.getCurrentUser().id;
      entryClass.name = newEntryGroupName;
      entryClass.description = newEntryGroupDescription;
      entryClass.type = 'RECEITA';
    } else {
      entryClass.id = Number.parseInt(entryGroupId, 10);
    }

    const entry = new Entry();
    entry.userId = this.routerService.getCurrentUser().id;
    entry.entryClass = entryClass;
    entry.date = date._selected.toISOString();
    entry.description = description;
    entry.entryType = 'RECEITA';
    entry.value = Number.parseFloat(value);

    this.bottomSheetRef.dismiss();
    this.routerService.saveEntry(entry).subscribe(async res => {
      this.messageService.openMessageBar('Salvo com sucesso', 2000);
      this.routerService.updateLocalStorageFromDatabase();
      this.entrySaved.emit();
    },
      err => {
        this.messageService.openMessageBar('Ops! Tivemos um erro ao salvar seu lançamento.', 3000);
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

  public doNothing() {
    this.entryClasses = this.entryClasses;
  }

  private async loadEntryClasses() {
    // save result
    this.entryClasses = await this.routerService.loadEntryClasses('RECEITA')
    .toPromise()
    .then(resp => resp as EntryClass[]);
}

  ngOnInit() {
    this.loadEntryClasses();
  }

}

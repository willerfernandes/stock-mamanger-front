import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';

import { MessageService } from 'src/app/common/services/message.service';
import { EntryClass } from '../../entities/entry-class';
import { NewExpenseViewComponent } from '../new-expense-view/new-expense-view.component';
import { Entry } from '../../entities/entry';
import { FinancialService } from '../../services/financial.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';


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

  group = new FormGroup({
    value: new FormControl()
 });

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private financialService: FinancialService,
    private authenticationService: AuthenticationService,
    private bottomSheetRef: MatBottomSheetRef<NewReceiptViewComponent>,
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
    this.validateFields(entryGroupId, newEntryGroupName, newEntryGroupDescription, date, this.group.value.value);

    /*const entryClass = new EntryClass();
    if (entryGroupId === 'new') {
      entryClass.userId = this.authenticationService.getCurrentUser().id;
      entryClass.name = newEntryGroupName;
      entryClass.description = newEntryGroupDescription;
      entryClass.type = 'RECEITA';
    } else {
      entryClass.id = Number.parseInt(entryGroupId, 10);
    }

    const entry = new Entry();
    entry.userId = this.authenticationService.getCurrentUser().id;
    entry.entryClass = entryClass;
    entry.date = date._selected.toISOString();
    entry.description = description;
    entry.entryType = 'RECEITA';
    entry.value = Number.parseFloat(this.group.value.value);*/

    this.bottomSheetRef.dismiss();
    this.financialService.saveEntry(this.group.value.value,
      entryGroupId, newEntryGroupName, newEntryGroupDescription, description,
      date._selected, false, null, null, 'RECEITA').subscribe(async res => {
      this.messageService.openMessageBar('Salvo com sucesso', 2000);
      this.entrySaved.emit();
      this.financialService.updateLocalStorageFromDatabase();
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
    this.entryClasses = await this.financialService.loadEntryClasses('RECEITA')
    .toPromise()
    .then(resp => resp as EntryClass[]);
}

  ngOnInit() {
    this.loadEntryClasses();
  }

}

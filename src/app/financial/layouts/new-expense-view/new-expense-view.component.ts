import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material';
import { MessageService } from 'src/app/common/services/message.service';
import { EntryClass } from '../../entities/entry-class';
import { Entry } from '../../entities/entry';
import { FinancialService } from '../../services/financial.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';



@Component({
  selector: 'app-new-expense-view',
  templateUrl: './new-expense-view.component.html',
  styleUrls: ['./new-expense-view.component.css']
})
export class NewExpenseViewComponent implements OnInit {

  public isNewEntryGroup = false;
  public entryClasses: EntryClass[];
  plots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  color: ThemePalette = 'primary';

  group = new FormGroup({
    value: new FormControl(Validators.required),
    entryClass: new FormControl(Validators.required),
    newEntryClassName: new FormControl('', Validators.required),
    newEntryClassDescription: new FormControl('', Validators.required),
    description: new FormControl(),
    date: new FormControl(new Date()),
    dateToogless: new FormControl(),
    installmentPurchase: new FormControl(false, Validators.required),
    numberOfPlots: new FormControl(Validators.required)
 });

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private financialService: FinancialService,
    private authenticationService: AuthenticationService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private messageService: MessageService) { }

    ngOnInit() {
      this.loadEntryClasses();
    }

  saveExpense(event: MouseEvent): void {

    const value = this.group.value.value;
    const entryClassId = this.group.value.entryClass;
    const newEntryClassName = this.group.value.newEntryClassName;
    const newEntryClassDescription = this.group.value.newEntryClassDescription;
    const description = this.group.value.description;
    const date = this.group.value.date;
    const installmentPurchase = this.group.value.installmentPurchase;
    const numberOfPlots = this.group.value.numberOfPlots;

    console.log(installmentPurchase);

    // TODO: validate with angular forms
    this.validateFields(entryClassId, newEntryClassName, newEntryClassDescription, date, value);
    const entryClass = new EntryClass();
    if (entryClassId === 'new') {
      entryClass.userId = this.authenticationService.getCurrentUser().id;
      entryClass.name = newEntryClassName;
      entryClass.description = newEntryClassDescription;
      entryClass.type = 'DESPESA';
    } else {
      entryClass.id = Number.parseInt(entryClassId, 10);
    }

    if (installmentPurchase) {
      this.createInstallmentPurchases(event, value, numberOfPlots, date, entryClass, description);
    } else {


      const entry = new Entry();
      entry.userId = this.authenticationService.getCurrentUser().id;
      entry.entryClass = entryClass;
      entry.date = date.toISOString();
      entry.description = description;
      entry.entryType = 'DESPESA';
      entry.value = Number.parseFloat(this.group.value.value);

      this.bottomSheetRef.dismiss();
      this.financialService.saveEntry(entry).subscribe(async res => {
        this.messageService.openMessageBar('Salvo com sucesso', 2000);
        this.entrySaved.emit();
        this.financialService.updateLocalStorageFromDatabase();
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
    const initialDate: Date = new Date(date.toISOString());
    for (let i = 0; i < numberOfPlots; i++) {
      const entry = new Entry();
      entry.userId = this.authenticationService.getCurrentUser().id;
      entry.entryClass = entryGroup;
      entry.date = new Date(initialDate.getFullYear(), initialDate.getMonth() + i, initialDate.getDate()).toISOString();
      entry.description = description + ' ' + '(' + (i + 1) + '/' + numberOfPlots + ')';
      entry.entryType = 'DESPESA';
      entry.value = eachPlotValue;
      this.financialService.saveEntry(entry).subscribe( () => {
        this.financialService.updateLocalStorageFromDatabase();
      });
    }
    this.messageService.openMessageBar('Salvo com sucesso', 2000);
    this.entrySaved.emit();
    event.preventDefault();
    this.bottomSheetRef.dismiss();
  }

  public doNothing() {
    this.entryClasses = this.entryClasses;
  }

  public validateFields(
    entryGroupId: string,
    newEntryGroupName: string,
    newEntryGroupDescription: string,
    date: any,
    value: string) {

    let isValidForm = true;

    if (entryGroupId === '---' || value == null || value === '' || date == null) {
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

  public selectValueChanged(entryGroupSelect: any): void {
    this.isNewEntryGroup = entryGroupSelect.value === 'new';
  }

  public closeButtonClicked() {
    this.bottomSheetRef.dismiss();
  }

  private async loadEntryClasses() {
      this.entryClasses = await this.financialService.loadEntryClasses('DESPESA')
      .toPromise()
      .then(resp => resp as EntryClass[]);
  }

}

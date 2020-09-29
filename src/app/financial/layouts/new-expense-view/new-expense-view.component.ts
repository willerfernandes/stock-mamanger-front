import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material';
import { MessageService } from 'src/app/common/services/message.service';
import { EntryClass } from '../../entities/entry-class';
import { Entry } from '../../entities/entry';
import { FinancialService } from '../../services/financial.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { Router } from '@angular/router';
import { RecurrentEntryGroup } from '../../entities/recurrent-entry-group';
import { RecurrentEntry } from '../../entities/recurrent-entry';



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
    value: new FormControl(null, Validators.required),
    entryClass: new FormControl(null, Validators.required),
    newEntryClassName: new FormControl('', Validators.required),
    newEntryClassDescription: new FormControl('', Validators.required),
    description: new FormControl(),
    date: new FormControl(new Date()),
    dateToogless: new FormControl(),
    installmentPurchase: new FormControl(false, Validators.required),
    numberOfPlots: new FormControl(Validators.required),
    recurrentEntry: new FormControl(false, Validators.required),
    recurrentDate: new FormControl(new Date())
 });

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private financialService: FinancialService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private messageService: MessageService,
    private router: Router)  { }

    ngOnInit() {
      this.loadEntryClasses();
      const clickedRecurrentEntry: RecurrentEntry = JSON.parse(sessionStorage.getItem('recurrentEntry'));
      if (clickedRecurrentEntry != null) {
        this.group.value.value = clickedRecurrentEntry.value;
        this.group.value.entryClassId = clickedRecurrentEntry.entryClass.id;
        this.group.value.description = clickedRecurrentEntry.description;
        this.group.value.date = clickedRecurrentEntry.dueDate;
      }
      sessionStorage.removeItem('recurrentEntry');
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
      const recurrentEntry = this.group.value.recurrentEntry;
      const recurrentDate = this.group.value.recurrentDate;

      this.validateFields(entryClassId, newEntryClassName, newEntryClassDescription, date, value);

      if (recurrentEntry)  {
        this.financialService.saveRecurrentEntry(value,
          entryClassId, newEntryClassName, newEntryClassDescription, description,
          date, recurrentDate, 'DESPESA').subscribe(async (newRecurrentEntry) => {

            this.financialService.saveEntry(value,
              entryClassId, newEntryClassName, newEntryClassDescription, description,
              date, installmentPurchase, numberOfPlots, newRecurrentEntry.id, 'DESPESA').subscribe(async () => {
                this.messageService.openMessageBar('Salvo com sucesso', 2000);
                this.entrySaved.emit();
                this.financialService.updateLocalStorageFromDatabase();
              },
               err => {this.messageService.openMessageBar('Ops! Tivemos um erro ao salvar seu lançamento.', 3000); });
        });
      } else {
        this.financialService.saveEntry(value,
          entryClassId, newEntryClassName, newEntryClassDescription, description,
          date, installmentPurchase, numberOfPlots, null, 'DESPESA').subscribe(async () => {
            this.messageService.openMessageBar('Salvo com sucesso', 2000);
            this.entrySaved.emit();
            this.financialService.updateLocalStorageFromDatabase();
          },
           err => {this.messageService.openMessageBar('Ops! Tivemos um erro ao salvar seu lançamento.', 3000); });
      }

      event.preventDefault();
      this.bottomSheetRef.dismiss();
      console.log(localStorage);
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

    if ( entryGroupId === '---' || value == null || value === '' || date == null) {
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

  public openRecurrentEntries(): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['/recurrent-entries']);
  }

}

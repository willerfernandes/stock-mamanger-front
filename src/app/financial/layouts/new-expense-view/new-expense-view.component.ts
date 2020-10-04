import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ThemePalette } from '@angular/material';
import { MessageService } from 'src/app/common/services/message.service';
import { EntryClass } from '../../entities/entry-class';
import { FinancialService } from '../../services/financial.service';
import { Router } from '@angular/router';
import { RecurrentEntry } from '../../entities/recurrent-entry';



@Component({
  selector: 'app-new-expense-view',
  templateUrl: './new-expense-view.component.html',
  styleUrls: ['./new-expense-view.component.css']
})
export class NewExpenseViewComponent implements OnInit {

  public isNewEntryGroup = false;
  private recurrentEntryId: number;
  public entryClasses: EntryClass[];
  plots = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  colors = ['#d4bbfc', '#bbbdfc', '#fcbbbb', '#fcf3bb', '#bbfcbc',
  '#fcd7bb', '#3644e3', '#9836e3', '#c726af', '#c7c426', '#75c425', '#bf2462', '#a1a1a1',
  '#dcd7bb', '#e644e3', '#a836e3', '#b726af', '#a7c426', '#b5c425', '#ff2462', '#e1a1a1'];
  newEntryClassSuggestedColor = '';
  color: ThemePalette = 'primary';
  group: FormGroup;
  title = 'Despesas';
  titleClass = 'menu-item-text red-text';
  inputIcon = './assets/img/credit-card-icon.svg';
  menuItem = './assets/img/add-menu-expense.svg';
  entryType = 'DESPESA';

  @Output()
  public entrySaved = new EventEmitter();

  constructor(
    private financialService: FinancialService,
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder)  {this.createForm(); }


    createForm() {
      this.group = this.fb.group({
        value: [null, Validators.required ],
        entryClass: [null, Validators.required ],
        newEntryClassName: ['', Validators.required ],
        newEntryClassDescription: ['', Validators.required ],
        newEntryClassColor: [Validators.required],
        description: [''],
        date: [new Date(), Validators.required ],
        dateToogless: [false],
        installmentPurchase: [false, Validators.required ],
        numberOfPlots: [2, Validators.required ],
        recurrentEntry: [false, Validators.required ],
        recurrentDate: [new Date(2030, 11, 1)]
      });
    }

    ngOnInit() {
      this.loadEntryClasses();
      const clickedRecurrentEntry: RecurrentEntry = JSON.parse(sessionStorage.getItem('recurrentEntry'));
      if (clickedRecurrentEntry != null) {
        this.recurrentEntryId = clickedRecurrentEntry.id;
        this.group.controls.value.setValue(clickedRecurrentEntry.value);
        this.group.controls.entryClass.setValue(clickedRecurrentEntry.entryClass.id);
        this.group.controls.description.setValue(clickedRecurrentEntry.description);
      }
      sessionStorage.removeItem('recurrentEntry');
    }

    saveExpense(event: MouseEvent): void {

      const value = this.group.value.value;
      const entryClassId = this.group.value.entryClass;
      const newEntryClassName = this.group.value.newEntryClassName;
      const newEntryClassDescription = this.group.value.newEntryClassDescription;
      const input = document.getElementById('colorId') as (HTMLInputElement);
      const newEntryClassColor = input.value;
      const description = this.group.value.description;
      const date = this.group.value.date;
      const installmentPurchase = this.group.value.installmentPurchase;
      const numberOfPlots = this.group.value.numberOfPlots;
      const recurrentEntry = this.group.value.recurrentEntry;
      const recurrentDate = this.group.value.recurrentDate;

      this.validateFields(entryClassId, newEntryClassName, newEntryClassDescription, date, value);

      if (recurrentEntry)  {
        this.financialService.saveRecurrentEntry(value,
          entryClassId, newEntryClassName, newEntryClassDescription, newEntryClassColor, description,
          date, recurrentDate, this.entryType).subscribe(async (newRecurrentEntry) => {

            this.financialService.saveEntry(value,
              entryClassId, newEntryClassName, newEntryClassDescription, newEntryClassColor, description,
              date, installmentPurchase, numberOfPlots, newRecurrentEntry.id, this.entryType).subscribe(async () => {
                this.messageService.openMessageBar('Salvo com sucesso', 2000);
                this.entrySaved.emit();
                this.financialService.updateLocalStorageFromDatabase();
              },
               err => {this.messageService.openMessageBar('Ops! Tivemos um erro ao salvar seu lançamento.', 3000); });
        });
      } else {
        this.financialService.saveEntry(value,
          entryClassId, newEntryClassName, newEntryClassDescription, newEntryClassColor, description,
          date, installmentPurchase, numberOfPlots, this.recurrentEntryId, this.entryType).subscribe(async () => {
            this.messageService.openMessageBar('Salvo com sucesso', 2000);
            this.entrySaved.emit();
            this.financialService.updateLocalStorageFromDatabase();
          },
           err => {this.messageService.openMessageBar('Ops! Tivemos um erro ao salvar seu lançamento.', 3000); });
      }

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
      this.entryClasses = await this.financialService.loadEntryClasses(this.entryType)
      .toPromise()
      .then(resp => resp as EntryClass[]);
      this.newEntryClassSuggestedColor = this.colors[this.entryClasses.length];
      this.group.value.newEntryClassColor = this.colors[this.entryClasses.length];
  }

  public openRecurrentEntries(): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['/recurrent-entries']);
  }

}

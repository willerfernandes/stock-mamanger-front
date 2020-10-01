import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/common/services/message.service';
import { FinancialService } from '../../services/financial.service';
import { Location } from '@angular/common';
import { RecurrentEntryGroup } from '../../entities/recurrent-entry-group';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntryClass } from '../../entities/entry-class';
import { RecurrentEntry } from '../../entities/recurrent-entry';

@Component({
  selector: 'app-recurrent-entry-edit-view',
  templateUrl: './recurrent-entry-edit-view.component.html',
  styleUrls: ['./recurrent-entry-edit-view.component.css']
})
export class RecurrentEntryEditViewComponent implements OnInit {

  public entryGroup: RecurrentEntryGroup;
  public formGroup: FormGroup;
  public isNewRecurrentEntry = false;;
  public entryClasses: EntryClass[];

  constructor(private financialService: FinancialService,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService,
              private router: Router,
              private fb: FormBuilder) { this.createForm();  }


createForm() {
  this.formGroup = this.fb.group({
    value: [null, Validators.required ],
    description: [''],
    dueDate: [new Date(), Validators.required ],
    maxDate: [new Date(), Validators.required ],
    entryClass: [null, Validators.required ]
  });
}

  ngOnInit() {
    this.loadEntryClasses();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === 0) {
      this.isNewRecurrentEntry = true;
    } else {
      this.financialService.loadRecurrentEntryGroup(id).subscribe((res: RecurrentEntryGroup) => {
        this.entryGroup = res;
      });

      this.formGroup.controls.value.setValue(this.entryGroup.recurrentEntry.value);
      this.formGroup.controls.description.setValue(this.entryGroup.recurrentEntry.description);
      this.formGroup.controls.dueDate.setValue(new Date(this.entryGroup.recurrentEntry.dueDate));
      this.formGroup.controls.maxDate.setValue(new Date(this.entryGroup.recurrentEntry.maxDate));
      // this.formGroup.controls.maxDate.setValue(new Date(this.entryGroup.recurrentEntry.entryClass.name));
    }
  }

  onDelete(): void {
      this.messageService.openMessageBar('Lançamento excluido com sucesso', 2000);
      this.ngOnInit();
  }

  save(): void {
    if (this.formGroup.invalid) {
      this.messageService.openMessageBar('Preencha todos os campos do formulário', null);
    }

    if (this.isNewRecurrentEntry) {
      this.saveRecurrentEntry();
    } else {
      this.updateRecurrentEntry();
    }

    this.goBack();
  }

  private saveRecurrentEntry() {

    const value = this.formGroup.controls.value.value;
    const description = this.formGroup.controls.description.value;
    const dueDate = this.formGroup.controls.dueDate.value;
    const maxDate = this.formGroup.controls.maxDate.value;
    const entryClassId: number = Number.parseInt(this.formGroup.controls.entryClass.value, 10);
    const entryType: string = this.entryClasses.find(recurrentEntry => recurrentEntry.id === entryClassId).type;

    this.financialService.saveRecurrentEntry(value,
      entryClassId.toString(), null, null, description,
      dueDate, maxDate, entryType).subscribe(res => {
        this.messageService.openMessageBar('Criado com sucesso', 2000);
        this.financialService.updateLocalStorageFromDatabase();
      },
      err => { this.messageService.openMessageBar('Houve um erro ao atualizar o lançamento recorrente', null); }
      );
  }

  private updateRecurrentEntry() {
    this.entryGroup.recurrentEntry.value = this.formGroup.controls.value.value;
    this.entryGroup.recurrentEntry.description = this.formGroup.controls.description.value;
    this.entryGroup.recurrentEntry.dueDate = this.formGroup.controls.dueDate.value;
    this.entryGroup.recurrentEntry.maxDate = this.formGroup.controls.maxDate.value;

    this.financialService.updateRecurrentEntry(this.entryGroup.recurrentEntry).subscribe(
      () => {
        this.messageService.openMessageBar('Atualizado com sucesso', 2000);
        this.financialService.updateLocalStorageFromDatabase();
      },
      () => this.messageService.openMessageBar('Houve um erro ao atualizar o lançamento recorrente', null));
  }

  public async deleteRecurrentEntry() {
    await this.financialService.deleteRecurrentEntry(this.entryGroup.recurrentEntry.id)
    .toPromise()
    .then( res => {
      this.messageService.openMessageBar('Exlcuido com sucesso', 2000);
      this.goBack();
    }, err => {
      this.messageService.openMessageBar('Houve um erro ao excluir o lançamento', null);
      this.goBack();
    });
  }

  private async loadEntryClasses() {
    this.entryClasses = await this.financialService.loadEntryClasses(null)
    .toPromise()
    .then(resp => resp as EntryClass[]);
}
  goBack(): void {
    this.location.back();
  }

}

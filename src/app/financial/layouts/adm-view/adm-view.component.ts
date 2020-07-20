import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/common/services/message.service';
import { FinancialService } from '../../services/financial.service';


@Component({
  selector: 'app-adm-view',
  templateUrl: './adm-view.component.html',
  styleUrls: ['./adm-view.component.css']
})
export class AdmViewComponent implements OnInit {

  public entries = '';
  public entryClasses = '';

  constructor(private financialService: FinancialService, private messageService: MessageService) { }

  ngOnInit() {
    this.financialService.loadEntriesFromStorage().subscribe( res => {
      this.entries = res;
    });

    this.financialService.loadEntryClassesFromStorage().subscribe( res => {
      this.entryClasses = res;
    });
  }

  public updateLocalStorage(entries: string, entryClasses: string) {
    this.financialService.updateEntriesOnStorage(entries);
    this.financialService.updateEntryClassesOnStorage(entryClasses);
    this.messageService.openMessageBar('Atualizado com sucesso', 1000);
    this.ngOnInit();
  }

  public clearLocalStorage() {
    this.financialService.clearStorage();
    this.messageService.openMessageBar('Todos os dados foram removidos', 1000);
    this.ngOnInit();
  }

}

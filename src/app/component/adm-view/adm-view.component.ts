import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/services/fake.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-adm-view',
  templateUrl: './adm-view.component.html',
  styleUrls: ['./adm-view.component.css']
})
export class AdmViewComponent implements OnInit {

  public entries = '';
  public entryClasses = '';

  constructor(private fakeService: FakeService, private messageService: MessageService) { }

  ngOnInit() {
    this.fakeService.loadEntriesFromStorage().subscribe( res => {
      this.entries = res;
    });

    this.fakeService.loadEntryClassesFromStorage().subscribe( res => {
      this.entryClasses = res;
    });
  }

  public updateLocalStorage(entries: string, entryClasses: string) {
    this.fakeService.updateEntriesOnStorage(entries);
    this.fakeService.updateEntryClassesOnStorage(entryClasses);
    this.messageService.openMessageBar('Atualizado com sucesso', 1000);
    this.ngOnInit();
  }

  public clearLocalStorage() {
    this.fakeService.clearStorage();
    this.messageService.openMessageBar('Todos os dados foram removidos', 1000);
    this.ngOnInit();
  }

}

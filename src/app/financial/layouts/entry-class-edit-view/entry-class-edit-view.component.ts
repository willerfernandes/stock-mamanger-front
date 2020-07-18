import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterService } from 'src/app/financial/services/router.service';
import { MessageService } from 'src/app/financial/services/message.service';
import { EntryClass } from '../../entities/entry-class';

@Component({
  selector: 'app-entry-class-edit-view',
  templateUrl: './entry-class-edit-view.component.html',
  styleUrls: ['./entry-class-edit-view.component.css']
})
export class EntryClassEditViewComponent implements OnInit {


  entryForm: FormGroup;

  public entryClass: EntryClass;

  public types = ['RECEITA', 'DESPESA'];

  constructor(private routerService: RouterService,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService,
              private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  public async deleteEntryClass() {
    /*this.expenseService.deleteEntryClass(this.entryClass.id).subscribe( (res) =>
    this.messageService.openMessageBar('Categoria removida com sucesso', 2000)
    , err => this.messageService.openMessageBar(err, 2000)
    );*/

    await this.routerService.deleteEntryClass(this.entryClass.id)
    .toPromise()
    .then();

    this.router.navigate(['/expense-dashboard']);
  }

  public save(name: string, description: string) {
    this.entryClass.name = name;
    this.entryClass.description = description;
    this.routerService.saveEntryClass(this.entryClass).subscribe(
     () => {
       this.messageService.openMessageBar('Categoria atualizada com sucesso', 2000);
       this.routerService.updateLocalStorageFromDatabase();
     },
     () => this.messageService.openMessageBar('Houve um erro ao atualizar a categoria', 2000));
    this.router.navigate(['/expense-dashboard']);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.routerService.loadEntryClass(id).subscribe((res: EntryClass) => {
      this.entryClass = res;
      /*this.entryForm = this.fb.group({
        typeControl: ['DESPESA']
      });*/
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterService } from 'src/app/financial/services/router.service';
import { EntryClass } from '../../entities/entry-class';


@Component({
  selector: 'app-entry-class-list-view',
  templateUrl: './entry-class-list-view.component.html',
  styleUrls: ['./entry-class-list-view.component.css']
})
export class EntryClassListViewComponent implements OnInit {

  public expensesEntryClasses: EntryClass[];
  public receiptEntryClasses: EntryClass[];


  constructor(private router: Router,
              private routerService: RouterService,
              private location: Location) { }

  ngOnInit() {
    this.routerService.loadEntryClasses(null).subscribe(storedEntryClasses => {
      this.expensesEntryClasses = storedEntryClasses.filter(entryClass => entryClass.type === 'DESPESA');
      this.receiptEntryClasses = storedEntryClasses.filter(entryClass => entryClass.type === 'RECEITA');
    });
  }

  goBack(): void {
    this.location.back();
  }

  public goToEditPage(id: number): void {
    this.router.navigate(['/classes/' + id]);
  }

  public delete(id: number): void {
    this.routerService.deleteEntryClass(id);
  }
}




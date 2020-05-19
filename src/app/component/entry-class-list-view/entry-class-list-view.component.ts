import { Component, OnInit } from '@angular/core';
import { EntryClass } from 'src/app/entities/categoria-lancamento';
import { Router } from '@angular/router';
import { FakeService } from 'src/app/services/fake.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entry-class-list-view',
  templateUrl: './entry-class-list-view.component.html',
  styleUrls: ['./entry-class-list-view.component.css']
})
export class EntryClassListViewComponent implements OnInit {

  public expensesEntryClasses: EntryClass[];
  public receiptEntryClasses: EntryClass[];


  constructor(private router: Router,
              private fakeService: FakeService,
              private expenseService: ExpenseService,
              private location: Location) { }

  ngOnInit() {
    this.expenseService.loadEntryClasses('').subscribe(storedEntryClasses => {
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
    this.fakeService.deleteEntryClass(id);
  }
}

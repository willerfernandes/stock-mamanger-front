import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/common/services/message.service';
import { RecurrentEntryGroup } from '../../entities/recurrent-entry-group';
import { FinancialService } from '../../services/financial.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recurrent-entry-list-view',
  templateUrl: './recurrent-entry-list-view.component.html',
  styleUrls: ['./recurrent-entry-list-view.component.css']
})
export class RecurrentEntryListViewComponent implements OnInit {

  public recurrentEntryGroups: RecurrentEntryGroup[];

  constructor(private router: Router,
              private financialService: FinancialService,
              private messageService: MessageService,
              private location: Location) { }


  ngOnInit() {
    this.loadRecurrentEntries();
  }


  private loadRecurrentEntries(): void {
    const groups: RecurrentEntryGroup[] = [];
    this.financialService.loadRecurrentEntries().subscribe(storedRecurrentEntries => {
      for (const entry of storedRecurrentEntries) {
        const newGroup = new RecurrentEntryGroup();
        newGroup.recurrentEntry = entry;
        groups.push(newGroup);
      }
      this.recurrentEntryGroups =  groups;
    },
    err => {
      this.messageService.openMessageBar('Houve um erro ao buscar os lançamentos recorrentes', null);
    });
  }

  goBack(): void {
    this.location.back();
  }

  gotoNewRecurrentEntryView(): void {
      this.router.navigate(['/recurrent-entries/' + 'new']);
  }

  public goToEditView(id: number): void {
    this.router.navigate(['/recurrent-entries/' + id]);
  }

  public delete(id: number): void {
    this.financialService.deleteEntryClass(id);
  }


}

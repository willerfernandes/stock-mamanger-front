import { Component, OnInit, Input } from '@angular/core';
import { Lancamento } from 'src/app/entities/lancamento';
import { GrupoLancamento } from 'src/app/entities/grupo-lancamento';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css']
})
export class EntryTableComponent implements OnInit {

  public displayedColumns = ['Categoria', 'Descrição', 'Data', 'Valor'];

  @Input()
  public entryGroups: GrupoLancamento[] = [];

  public entries: Lancamento[] = [];

  constructor() { }

  ngOnInit() {
    this.getEntries();
  }

  private getEntries(): void {
    this.entryGroups.forEach(group => {
      this.entries = this.entries.concat(group.lancamentos);
    });
  }

}

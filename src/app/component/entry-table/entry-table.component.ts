import { Component, OnInit, Input } from '@angular/core';
import { Lancamento } from 'src/app/entities/lancamento';
import { GrupoLancamento } from 'src/app/entities/grupo-lancamento';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('0.4s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class EntryTableComponent implements OnInit {

  public displayedColumns = ['Categoria', 'Descrição', 'Data', 'Valor'];

  @Input()
  public entries: Lancamento[] = [];

  monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI',
    'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    weekDayNames = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  constructor() { }

  ngOnInit() {
  }

  public getEntryMonthName(data: string): string {

    return this.monthNames[new Date(data).getMonth()];
  }

  public getEntryDateMonthDay(data: string): number {
    return new Date(data).getDate();
  }

  public getEntryDateWeekDayName(data: string): string {
    return this.weekDayNames[new Date(data).getDay() - 1];
  }


}

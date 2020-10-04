import { Component, OnInit, Input } from '@angular/core';
import { RecurrentEntryGroup } from '../../entities/recurrent-entry-group';

@Component({
  selector: 'app-recurrent-entry-card',
  templateUrl: './recurrent-entry-card.component.html',
  styleUrls: ['./recurrent-entry-card.component.css']
})
export class RecurrentEntryCardComponent implements OnInit {


  constructor() { }

  @Input()
  public entryGroup: RecurrentEntryGroup;

  @Input()
  public isOk = false;

  @Input()
  public hideTag = false;

  public remainingDaysText: string = null;

  public tagText = 'NOT';
  public tagClass = '';

  ngOnInit() {
    if (this.isOk) {
      this.tagClass = 'tag-green';
      this.tagText = 'OK';
      this.remainingDaysText = 'LANÇADO!';
    } else {
      this.setTagText();
      this.remainingDaysText = this.getRemainingDaysText();
    }
  }

  setTagText(): void {
    const numberOfDaysBeforeDueDatedifference = this.getNumberOfDaysBeforeDueDate();
    if (this.entryGroup.isCheckedForThisPeriod) {
      this.tagClass = 'tag-green';
      this.tagText = 'OK';
      return;
    }
    if (numberOfDaysBeforeDueDatedifference > 3) {
      this.tagClass = 'tag-yellow';
      this.tagText = 'PEND.';
    }
    if (numberOfDaysBeforeDueDatedifference <= 3 && numberOfDaysBeforeDueDatedifference > 0) {
      this.tagClass = 'tag-red';
      this.tagText = 'PROX.';
    }

    if (numberOfDaysBeforeDueDatedifference === 0) {
      this.tagClass = 'tag-red';
      this.tagText = 'HOJE';
    }

    if (numberOfDaysBeforeDueDatedifference < 0) {
      this.tagClass = 'tag-dark-red';
      this.tagText = 'ATRAS.';
    }
  }

  getRemainingDaysText(): string {
    return null;
    const difference = this.getNumberOfDaysBeforeDueDate();
    if (difference > 0) {
      return 'Vence em ' + difference + ' dias';
    }
    if (difference === 0) {
      return 'Vence hoje!';
    }
    if (difference > 0) {
      return 'Vencido há ' + difference + ' dias';
    }
  }

  public getDueDateToThisMonth(): Date {
    const dueDateToThisMonth: Date = new Date(this.entryGroup.recurrentEntry.dueDate);
    dueDateToThisMonth.setMonth(new Date().getMonth());
    return dueDateToThisMonth;
  }


  private getNumberOfDaysBeforeDueDate(): number {
    const dueDate: Date = new Date(this.entryGroup.recurrentEntry.dueDate);
    const now: Date = new Date();
    const difference = dueDate.getDate() - now.getDate();
    return difference;
  }
}

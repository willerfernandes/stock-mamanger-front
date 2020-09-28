import { Component, OnInit, Input } from '@angular/core';
import { RecurrentEntry } from '../../entities/recurrent-entry';

@Component({
  selector: 'app-recurrent-entry-card',
  templateUrl: './recurrent-entry-card.component.html',
  styleUrls: ['./recurrent-entry-card.component.css']
})
export class RecurrentEntryCardComponent implements OnInit {


  constructor() { }

  @Input()
  public entry: RecurrentEntry;

  @Input()
  public isOk = false;

  public remainingDaysText: number = null;

  public tagText = 'NOT';
  public tagClass = '';

  ngOnInit() {
    if (this.isOk) {
      this.tagClass = 'tag-green';
      this.tagText = 'OK';
    } else {
      this.setTagText();
    }
  }

  setTagText(): void {
    const numberOfDaysBeforeDueDatedifference = this.getNumberOfDaysBeforeDueDate();
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
      this.tagClass = 'tag-red';
      this.tagText = 'VENCIDO';
    }
  }

  getRemainingDaysText(): string {
    console.log(this.entry);
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


  private getNumberOfDaysBeforeDueDate(): number {
    const dueDate: Date = new Date(this.entry.dueDate);
    const now: Date = new Date();
    const difference = dueDate.getDay() - now.getDay();
    return difference;
  }
}

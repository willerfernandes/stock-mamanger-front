import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'btn-secondary-blue-large',
  templateUrl: './btn-secondary-blue-large.component.html',
  styleUrls: ['./btn-secondary-blue-large.component.css']
})
export class BtnSecondaryBlueLargeComponent implements OnInit {
  loading: boolean;

  @Input()
  isLoading = false;

  @Input()
  isloadingButtonType = false;

  @Input()
  public text: string;

  @Output()
  public clickedEvent = new EventEmitter();

  click() {
    if (this.isloadingButtonType && !this.isLoading) {
      this.isLoading = true;
      this.clickedEvent.emit();
    } else if (!this.isLoading) {
      this.clickedEvent.emit();
    }
  }

  ngOnInit() {
  }
}

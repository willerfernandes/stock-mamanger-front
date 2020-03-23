import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'btn-secondary-blue',
  templateUrl: './btn-secondary-blue.component.html',
  styleUrls: ['./btn-secondary-blue.component.css']
})
export class BtnSecondaryBlueComponent implements OnInit {
  constructor() { }

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
